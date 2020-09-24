import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { createAccount } from '../../api/mock';

const RegisterScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const createGuardian = () => {
    setErrorMessage('');
    createAccount('test@test.ca', 'password')
      .then((val) => {
        navigation.navigate('GuardianHome');
      })
      .catch((err) => {
        console.log('error: ' + err.message);
        setErrorMessage(err.message);
      });
  };

  return (
    <View style={styles.formView}>
      <Text>Ambulance Register</Text>
      <Button title='Register' onPress={createGuardian} />
      <Button
        title='Sign In'
        onPress={() => navigation.navigate('Login')}
      ></Button>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
