import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserSubmit = () => {
  return (
    <View style={styles.contatiner}>
      <Text>Take Photo of Accident</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserSubmit;
