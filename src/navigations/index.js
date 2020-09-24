import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Both
import ChoiceScreen from '../screens/ChoiceScreen';

// Guardian
import LoginScreen from '../screens/guardian/LoginScreen';
import RegisterScreen from '../screens/guardian/RegisterScreen';
import GuardianHome from '../screens/guardian/GuardianHome';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Choice' component={ChoiceScreen} />
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='register' component={RegisterScreen} />
        <Stack.Screen name='GuardianHome' component={GuardianHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
