import React from 'react';
import { Button, Text, View } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Ambulance Login</Text>
      <Button
        title='Register'
        onPress={() => navigation.navigate('register')}
      ></Button>
    </View>
  );
};

export default LoginScreen;
