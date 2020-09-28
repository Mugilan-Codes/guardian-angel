import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

const GuardianMap = () => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission needs to be given for map');
      }

      let location = await Location.getCurrentPositionAsync();
      console.log(`Location of Guardian: ${JSON.stringify(location)}`);
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMessage) {
    text = errorMessage;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default GuardianMap;
