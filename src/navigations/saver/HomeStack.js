import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserHome from '../../screens/user/UserHome';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={UserHome} />
    </Stack.Navigator>
  );
};

export default HomeStack;
