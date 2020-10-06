import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Callout, Marker } from 'react-native-maps';

import { firebase_instance, firestore } from '../../database/firebaseDB';
import { AuthContext } from '../../navigations/AuthProvider';

const GuardianMap = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [available, setAvailable] = useState(true);
  const [activeData, setActiveData] = useState({
    location: {
      latitude,
      longitude,
    },
  });
  const { user } = useContext(AuthContext);

  const activeCollectionRef = firestore.collection('active');
  const saverCollectionRef = firestore.collection('savers');
  const guardianDocRef = firestore.collection('guardians').doc(user.email);

  useEffect(() => {
    (async () => {
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLatitude(latitude);
      setLongitude(longitude);

      guardianDocRef.onSnapshot(function (doc) {
        setAvailable(doc.data().available);
      });

      // Handle Guardian Availability and Active cases
      if (available) {
        await activeCollectionRef.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (!doc.data().accepted && doc.data().accepted !== undefined) {
              setActiveData(doc.data());
              setAvailable(false);
              activeCollectionRef
                .doc(doc.data().email)
                .update({ accepted: true });
              guardianDocRef.update({ available: false });
              return;
            }
          });
        });
      }
    })();
  }, [Location]);

  const _requestLocationPermission = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Error', 'Permission needs to be given for map');
    }
  };

  const completePickUp = async () => {
    await activeCollectionRef.doc(activeData.email).update({ completed: true });
    await saverCollectionRef.doc(activeData.email).update({
      history: firebase_instance.firestore.FieldValue.arrayUnion(activeData),
    });
    await guardianDocRef.update({
      available: true,
      history: firebase_instance.firestore.FieldValue.arrayUnion(activeData),
    });
    await activeCollectionRef.doc(activeData.email).delete();
    setActiveData({});
    // setAvailable(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
        showsUserLocation
        onMapReady={() => _requestLocationPermission()}
        rotateEnabled={false}
        mapType='hybrid'
        style={styles.mapStyle}
      >
        {!available && (
          <Marker
            coordinate={{
              latitude: activeData.location.latitude,
              longitude: activeData.location.longitude,
            }}
          />
        )}
      </MapView>
      {!available && (
        <Callout style={styles.calloutBtn}>
          <TouchableOpacity
            style={styles.touchableContainer}
            onPress={completePickUp}
          >
            <Text style={styles.touchableText}>Completed</Text>
          </TouchableOpacity>
        </Callout>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.06,
  },
  calloutBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#3443df',
  },
  touchableContainer: {
    padding: 10,
  },
  touchableText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default GuardianMap;
