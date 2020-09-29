import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

import { AuthContext } from '../../navigations/AuthProvider';

const UserSidebar = ({ navigation, user, logout }) => {
  return (
    <View style={styles.container}>
      <Text>{user.email}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Text>History</Text>
      </TouchableOpacity>
      <Button title='Sign Out' onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default UserSidebar;
