import React, { useContext } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

import { AuthContext } from '../../navigations/AuthProvider';

const GuardianProfile = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      <Text>{user.email}</Text>
      <Button title='Log-Out' onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GuardianProfile;
