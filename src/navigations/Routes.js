import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChoiceScreen from '../screens/ChoiceScreen';
import { GuardianRoutes } from './guardian';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Choice'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Choice' component={ChoiceScreen} />
        <Stack.Screen name='GuardianStack' component={GuardianRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
