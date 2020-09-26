import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { getUsers } from '../../api/mock';
import { setToken } from '../../api/token';

const GuardianHome = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [hasLoadedUser, setHasLoadedUser] = useState(false);
  const [userLoadingErrorMessage, setUserLoadingErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!hasLoadedUser) {
        loadUsers();
      }
    });

    return unsubscribe;
  }, [loadUsers, navigation]);

  const loadUsers = () => {
    getUsers()
      .then((res) => {
        setHasLoadedUser(true);
        setUserLoadingErrorMessage(res.message);
        setUsers(res.users);
      })
      .catch((e) => {
        handleUserLoadingError(e);
      });
  };

  const handleUserLoadingError = (e) => {
    if (e.error === 401) {
      navigation.navigate('Login');
    } else {
      setHasLoadedUser(false);
      setUserLoadingErrorMessage(e.message);
    }
  };

  const logout = async () => {
    setHasLoadedUser(false);
    setUsers([]);
    await setToken('');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text>Guardian Home With Map</Text>
      {users.map((user) => (
        <Text key={user.email}>{user.email}</Text>
      ))}
      {userLoadingErrorMessage ? <Text>{userLoadingErrorMessage}</Text> : null}
      <Button title='Log Out' onPress={logout} />
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

export default GuardianHome;
