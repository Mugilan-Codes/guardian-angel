import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Both
import ChoiceScreen from '../screens/ChoiceScreen';

// Guardian
import LoginScreen from '../screens/guardian/LoginScreen';
import RegisterScreen from '../screens/guardian/RegisterScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Choice'
          component={ChoiceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
