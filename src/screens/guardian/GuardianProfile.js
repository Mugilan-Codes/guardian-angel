import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { firebase_auth } from '../../database/firebaseDB';

import { AuthContext } from '../../navigations/AuthProvider';

const GuardianProfile = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View>
      <Text>Profile Page</Text>
      <Text>{user.email}</Text>
      <Button title='Log-Out' onPress={logout} />
    </View>
  );
};

export default GuardianProfile;
