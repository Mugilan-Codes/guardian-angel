import React from 'react';
import { Button, Text, View } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Ambulance Register</Text>
      <Button
        title='Login'
        onPress={() => navigation.navigate('login')}
      ></Button>
    </View>
  );
};

export default RegisterScreen;
