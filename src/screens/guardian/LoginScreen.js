import React from 'react';
import { Button } from 'react-native';

import { login } from '../../api/mock';
import EmailForm from '../../forms/EmailForm';

const LoginScreen = ({ navigation }) => {
  return (
    <EmailForm
      buttonText='Log In'
      onSubmit={login}
      onAuthentication={() => navigation.navigate('GuardianHome')}
    >
      <Button
        title='Create Account'
        onPress={() => navigation.navigate('Register')}
      />
    </EmailForm>
  );
};

export default LoginScreen;
