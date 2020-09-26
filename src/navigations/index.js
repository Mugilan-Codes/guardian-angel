import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Both
import ChoiceScreen from '../screens/ChoiceScreen';

// Guardian
import LoginScreen from '../screens/guardian/LoginScreen';
import RegisterScreen from '../screens/guardian/RegisterScreen';
import GuardianHome from '../screens/guardian/GuardianHome';

// User
import UserLogin from '../screens/user/UserLogin';
import UserRegister from '../screens/user/UserRegister';
import UserHome from '../screens/user/UserHome';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='UserRegister'
      >
        <Stack.Screen name='Choice' component={ChoiceScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='GuardianHome' component={GuardianHome} />
        <Stack.Screen name='UserLogin' component={UserLogin} />
        <Stack.Screen name='UserRegister' component={UserRegister} />
        <Stack.Screen name='UserHome' component={UserHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
