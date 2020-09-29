import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserLogin from '../../screens/user/UserLogin';
import UserRegister from '../../screens/user/UserRegister';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Login' component={UserLogin} />
      <Stack.Screen name='Register' component={UserRegister} />
    </Stack.Navigator>
  );
};

export default AuthStack;
