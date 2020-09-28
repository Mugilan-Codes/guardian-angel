import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

const GuardianMap = () => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission needs to be given for map');
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMessage) {
    text = errorMessage;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log(text);

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
        rotateEnabled={false}
        mapType='hybrid'
        style={styles.mapStyle}
      />
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
