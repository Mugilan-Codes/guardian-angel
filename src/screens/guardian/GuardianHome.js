import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { getUsers } from '../../api/mock';

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

  render() {
    return (
      <View style={styles.container}>
        <Text>Guardian Home With Map</Text>
        {this.state.users.map((user) => (
          <Text key={user.email}>{user.email}</Text>
        ))}
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
