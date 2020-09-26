import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { firebase_auth } from '../../database/firebaseDB';
import FormButton from '../../components/FormButton';
import { windowHeight, windowWidth } from '../../utils/Dimensions';

const UserRegister = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      const user = await firebase_auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log({ user });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register to be a User</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder='E-Mail'
        placeholderTextColor='#666'
        numberOfLines={1}
        onChangeText={(userEmail) => setEmail(userEmail)}
        autoCapitalize='none'
        keyboardType='email-address'
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder='Password'
        placeholderTextColor='#666'
        numberOfLines={1}
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry
      />
      <FormButton buttonTitle='Register' onPress={signUp} />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('UserLogin')}
      >
        <Text style={styles.navButtonText}>Already a user? Sign In Here</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Choice')}
      >
        <Text style={styles.navButtonText}>Go Back To Choice Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  navButton: {
    marginTop: 10,
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee',
  },
});

export default UserRegister;
