import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';

import AppNavigator from './src/navigations';

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <>
      <StatusBar hidden />
      <AppNavigator />
    </>
  );
}
