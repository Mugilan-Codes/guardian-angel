import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

const GuardianMap = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const _requestLocationPermission = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage('Permission needs to be given for map');
    }
  };

  useEffect(() => {
    (async () => {
      // let { status } = await Location.requestPermissionsAsync();
      // if (status !== 'granted') {
      //   setErrorMessage('Permission needs to be given for map');
      // }

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLatitude(latitude);
      setLongitude(longitude);
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
        showsMyLocationButton={true}
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
