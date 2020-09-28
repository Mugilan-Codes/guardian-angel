import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GuardianHome from '../../screens/guardian/GuardianHome';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={GuardianHome} />
    </Stack.Navigator>
  );
};

export default HomeStack;
