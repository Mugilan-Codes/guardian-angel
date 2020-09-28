import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import GuardianHistory from './GuardianHistory';
import GuardianMap from './GuardianMap';
import GuardianProfile from './GuardianProfile';

const Tab = createMaterialTopTabNavigator();

const GuardianHome = () => {
  return (
    <Tab.Navigator
      initialRouteName='Map'
      tabBarPosition='bottom'
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name='History' component={GuardianHistory} />
      <Tab.Screen name='Map' component={GuardianMap} />
      <Tab.Screen name='Profile' component={GuardianProfile} />
    </Tab.Navigator>
  );
};

export default GuardianHome;
