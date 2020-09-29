import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import FormButton from '../../components/FormButton';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { AuthContext } from '../../navigations/AuthProvider';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Guardian Angel!</Text>
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
      <FormButton buttonTitle='Login' onPress={() => login(email, password)} />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.navButtonText}>New Guardian? Join Here</Text>
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

export default LoginScreen;
