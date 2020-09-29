import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserHistory = () => {
  return (
    <View style={styles.container}>
      <Text>User History</Text>
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

export default UserHistory;
