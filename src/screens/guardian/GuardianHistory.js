import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GuardianHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>History of Guardian</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#777',
  },
  text: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#333',
  },
});

export default GuardianHistory;
