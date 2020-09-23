import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChoiceScreen = () => {
  return (
    <View style={styles.cotainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>Guardian</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 50,
    backgroundColor: '#34e3f4',
  },
  btnText: {
    fontSize: 40,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default ChoiceScreen;
