import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const UserSidebar = ({ navigation, user, logout }) => {
  return (
    <View style={styles.container}>
      <Text>{user.email}</Text>
      <View style={styles.sidebarDivider} />
      <TouchableOpacity onPress={() => navigation.navigate('UserSubmitHome')}>
        <Text style={styles.title}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Text style={styles.title}>History</Text>
      </TouchableOpacity>
      <View style={styles.sidebarDivider} />
      <Button title='Sign Out' onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  sidebarDivider: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default UserSidebar;
