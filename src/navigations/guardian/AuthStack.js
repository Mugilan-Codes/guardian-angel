import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screens/guardian/LoginScreen';
import RegisterScreen from '../../screens/guardian/RegisterScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
