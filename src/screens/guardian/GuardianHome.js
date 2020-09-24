import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { getUsers } from '../../api/mock';
import { setToken } from '../../api/token';

export default class GuardianHome extends Component {
  state = {
    users: [],
    hasLoadedUser: false,
    userLoadingErrorMessage: '',
  };

  loadUsers() {
    this.setState({ hasLoadedUser: false, userLoadingErrorMessage: '' });
    getUsers()
      .then((res) => {
        this.setState({
          hasLoadedUser: true,
          users: res.users,
        });
      })
      .catch(this.handleUserLoadingError);
  }

  handleUserLoadingError = (res) => {
    if (res.error === 401) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        hasLoadedUser: false,
        userLoadingErrorMessage: res.message,
      });
    }
  };

  componentDidMount() {
    this.loadUsers();
  }

  logout = async () => {
    await setToken('');
    this.props.navigation.navigate('Login');
  };

  render() {
    const { users, userLoadingErrorMessage } = this.state;
    return (
      <View style={styles.container}>
        <Text>Guardian Home With Map</Text>
        {this.state.users.map((user) => (
          <Text key={user.email}>{user.email}</Text>
        ))}
        {userLoadingErrorMessage ? (
          <Text>{userLoadingErrorMessage}</Text>
        ) : null}
        <Button
          title='Log Out'
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
