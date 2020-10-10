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
import GetDirections from 'react-native-google-maps-directions';
import * as TaskManager from 'expo-task-manager';

import { firebase_instance, firestore } from '../../database/firebaseDB';
import { AuthContext } from '../../navigations/AuthProvider';

const GuardianMap = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [available, setAvailable] = useState(true);
  const [guardianData, setGuardianData] = useState({});
  const [activeData, setActiveData] = useState({
    location: {
      latitude,
      longitude,
    },
  });
  const { user } = useContext(AuthContext);

  const activeCollectionRef = firestore.collection('active');
  const guardianDocRef = firestore.collection('guardians').doc(user.email);

  const BACKGROUND_LOCATION_TASK = 'background_location_task';

  useEffect(() => {
    (async () => {
      _requestCurrentLocation();

      setGuardianData((await guardianDocRef.get()).data());

      guardianDocRef.onSnapshot(function (doc) {
        setAvailable(doc.data().available);
      });

      // Handle Guardian Availability and Active cases
      if (available) {
        await activeCollectionRef.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (!doc.data().accepted && doc.data().accepted !== undefined) {
              activeCollectionRef
                .doc(doc.data().email)
                .update({ accepted: true });
              activeCollectionRef.doc(doc.data().email).update({
                tracking: {
                  email: guardianData.email,
                  name: guardianData.name,
                  phone_number: guardianData.phone_number,
                  vehicle_number: guardianData.vehicle_number,
                  initial_location: new firebase_instance.firestore.GeoPoint(
                    latitude,
                    longitude
                  ),
                },
              });
              setActiveData(doc.data());
              guardianDocRef.update({ available: false });
              setAvailable(false);
              return;
            }
          });
        });
      }

      // Update Guardian Location every 5 seconds to active collection
      if (!available) {
        await activeCollectionRef.doc(activeData.email).update({
          'tracking.coords': new firebase_instance.firestore.GeoPoint(
            latitude,
            longitude
          ),
          'tracking.updated_on': firebase_instance.firestore.FieldValue.serverTimestamp(),
        });

        TaskManager.defineTask(
          BACKGROUND_LOCATION_TASK,
          ({ data: { locations }, error }) => {
            if (error) {
              console.log(`${error.code} - ${error.message}`);
              return;
            }
            console.log(locations.coords);
            setLatitude(locations.coords.latitude);
            setLongitude(locations.coords.longitude);
          }
        );
      }
    })();
  }, [_requestCurrentLocation]);

  const _requestCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location Permission is required');
    } else {
      await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
        activityType: Location.ActivityType.AutomotiveNavigation,
      });
    }

    let { coords } = await Location.getCurrentPositionAsync();

    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };

  const completePickUp = async () => {
    setAvailable(true);
    await guardianDocRef.update({
      available,
      history: firebase_instance.firestore.FieldValue.arrayUnion({
        user_email: activeData.email,
        timestamp: new Date(),
        destination: activeData.location,
        start_location: activeData.tracking.initial_location,
        photo_url: activeData.photo_url,
        info: activeData.info,
      }),
    });
    await activeCollectionRef.doc(activeData.email).update({ completed: true });
    // setActiveData({});
    await TaskManager.unregisterAllTasksAsync();
    // await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  };

  const handleGetDirections = () => {
    const data = {
      destination: {
        latitude: activeData.location.latitude,
        longitude: activeData.location.longitude,
      },
      params: [
        { key: 'travelmode', value: 'driving' },
        { key: 'dir_action', value: 'navigate' },
      ],
    };

    GetDirections(data);
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
        onMapReady={_requestCurrentLocation}
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
        <Callout style={styles.getDirection}>
          <TouchableOpacity
            style={styles.touchableContainer}
            onPress={handleGetDirections}
          >
            <Text style={styles.touchableText}>Open Maps</Text>
          </TouchableOpacity>
        </Callout>
      )}
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
  getDirection: {
    position: 'absolute',
    left: 10,
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
