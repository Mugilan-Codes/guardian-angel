import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { login } from '../../api/mock';
import { setToken } from '../../api/token';

const LoginScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const loginUser = async () => {
    setErrorMessage('');
    login('test@test.ca', 'password')
      .then(async (res) => {
        await setToken(res.auth_token);
        navigation.navigate('GuardianHome');
      })
      .catch((err) => {
        console.log('error: ' + err.message);
        setErrorMessage(err.message);
      });
  };

  return (
    <View style={styles.formView}>
      <Text>Ambulance Login</Text>
      <Button title='Log In' onPress={loginUser} />
      <Button
        title='Create Account'
        onPress={() => navigation.navigate('Register')}
      />
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

export default LoginScreen;
