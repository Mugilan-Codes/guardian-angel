import { StatusBar } from 'expo-status-bar';
import React from 'react';

import AppNavigator from './src/navigations';

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <AppNavigator />
    </>
  );
}
