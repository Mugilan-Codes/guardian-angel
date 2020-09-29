import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from '../../navigations/AuthProvider';
import UserSubmit from './UserSubmit';
import UserHistory from './UserHistory';
import UserSidebar from './UserSidebar';

const Drawer = createDrawerNavigator();

const UserHome = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Drawer.Navigator
      initialRouteName='UserSubmitHome'
      drawerContent={() => (
        <UserSidebar navigation={navigation} user={user} logout={logout} />
      )}
    >
      <Drawer.Screen name='UserSubmitHome' component={UserSubmit} />
      <Drawer.Screen name='History' component={UserHistory} />
    </Drawer.Navigator>
  );
};

export default UserHome;
