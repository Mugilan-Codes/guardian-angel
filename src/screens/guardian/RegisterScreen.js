import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import FormButton from '../../components/FormButton';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { firestore } from '../../database/firebaseDB';
import { AuthContext } from '../../navigations/AuthProvider';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { register } = useContext(AuthContext);

  const createGuardian = async (email) => {
    const docRef = firestore.collection('guardians').doc(email);

    await docRef.set({
      name,
      email,
      password,
      phone_number: phoneNumber,
      vehicle_number: vehicleNumber,
      created_on: new Date(),
      updated_on: new Date(),
      available: true,
    });

    setPhoneNumber('');
    setVehicleNumber('');
  };

  const signUp = async (email, password) => {
    setErrorMessage('');
    try {
      await createGuardian(email);
      register(email, password);
    } catch (err) {
      console.log(`Guardian Register Error: ${err.code} - ${err.message}`);
      setErrorMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register to be a Guardian</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder='Name'
        placeholderTextColor='#666'
        numberOfLines={1}
        onChangeText={(userName) => setName(userName)}
        autoCapitalize='none'
        autoCorrect={false}
      />
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
      <TextInput
        style={styles.input}
        value={vehicleNumber}
        placeholder="Vehicle Number: 'TN02AT3245'"
        placeholderTextColor='#666'
        numberOfLines={1}
        onChangeText={(vehicleNum) => setVehicleNumber(vehicleNum)}
        autoCapitalize='characters'
        autoCorrect={false}
        maxLength={10}
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        placeholder='Phone Number'
        placeholderTextColor='#666'
        numberOfLines={1}
        onChangeText={(phNum) => setPhoneNumber(phNum)}
        keyboardType='phone-pad'
        maxLength={10}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <FormButton
        buttonTitle='Register'
        onPress={() => signUp(email, password)}
      />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.navButtonText}>
          Already a Guardian? Sign In Here
        </Text>
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

export default RegisterScreen;
