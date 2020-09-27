import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import GuardianMap from './GuardianMap';
import GuardianProfile from './GuardianProfile';

const Tab = createMaterialTopTabNavigator();

const GuardianHome = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName='Map'>
      <Tab.Screen name='Map' component={GuardianMap} />
      <Tab.Screen name='Profile' component={GuardianProfile} />
    </Tab.Navigator>
  );
};

export default GuardianHome;
