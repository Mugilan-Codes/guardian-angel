import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { firebase_auth } from '../../database/firebaseDB';

const GuardianProfile = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    firebase_auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(JSON.stringify(user));
        console.log({ userData });
      }
    });
  }, []);

  const signOut = async () => {
    try {
      await firebase_auth.signOut();
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Profile Page</Text>
      <Button title='Log-Out' onPress={signOut} />
    </View>
  );
};

export default GuardianProfile;
