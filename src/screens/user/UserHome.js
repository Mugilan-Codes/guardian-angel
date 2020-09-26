import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { firebase_auth } from '../../database/firebaseDB';

const UserHome = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    firebase_auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        console.log(user.displayName);
      } else {
        navigation.navigate('UserLogin');
      }
    });
  }, [setUserEmail]);

  const signOut = async () => {
    try {
      await firebase_auth.signOut();
      console.log('Signed Out');
      navigation.navigate('UserLogin');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>User Home with History {userEmail}</Text>
      <Button title='Sign Out' onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserHome;
