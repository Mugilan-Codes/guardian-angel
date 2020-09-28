import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../AuthProvider';
import { firebase_auth } from '../../database/firebaseDB';
import Loading from '../../components/Loading';

import HomeStack from './HomeStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

export const GuardianRoutes = () => {
  const { user, setUser } = useContext(AuthContext);
  const { role, setRole } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = firebase_auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = (user) => {
    setUser(user);
    setRole('guardian');
    if (initializing) setInitializing(false);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (user && role == 'guardian') {
    return <HomeStack />;
  } else {
    return <AuthStack />;
  }
};
