import React, { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import { firestore } from '../../database/firebaseDB';
import { AuthContext } from '../../navigations/AuthProvider';

const GuardianMap = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { user } = useContext(AuthContext);

  const activeCollectionRef = firestore.collection('active');
  const guardianDocRef = firestore.collection('guardians').doc(user.email);

  const _requestLocationPermission = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage('Permission needs to be given for map');
    }
  };

  useEffect(() => {
    (async () => {
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLatitude(latitude);
      setLongitude(longitude);

      // Handle Guardian Availability and Active cases
      await activeCollectionRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(`${doc.id} ==> ${doc.data().accepted}`);
          if (!doc.data().accepted && doc.data().accepted !== undefined) {
            console.log(doc.data());
          }
        });
      });
    })();
  }, [Location]);

  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        showsUserLocation
        onMapReady={() => _requestLocationPermission()}
        rotateEnabled={false}
        mapType='hybrid'
        style={styles.mapStyle}
      />
      {errorMessage ? Alert.alert('Error', errorMessage) : null}
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
    height: Dimensions.get('window').height / 1.05,
  },
});

export default GuardianMap;
