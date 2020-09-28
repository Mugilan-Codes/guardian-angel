import React from 'react';

import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

const AppNavigator = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default AppNavigator;
