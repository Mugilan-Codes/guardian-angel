import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { login } from '../../api/mock';
import EmailForm from '../../forms/EmailForm';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default LoginScreen;
