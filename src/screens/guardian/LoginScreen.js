import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.formView}>
      <Text>Ambulance Login</Text>
      <Button
        title='Login'
        onPress={() => navigation.navigate('GuardianHome')}
      />
      <Button
        title='Create Account'
        onPress={() => navigation.navigate('register')}
      ></Button>
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
