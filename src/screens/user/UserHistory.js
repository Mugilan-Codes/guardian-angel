import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { firestore } from '../../database/firebaseDB';
import { AuthContext } from '../../navigations/AuthProvider';

const UserHistory = () => {
  const [history, setHistory] = useState([]);

  const { user } = useContext(AuthContext);

  const docRef = firestore.collection('savers').doc(user.email);

  useEffect(() => {
    docRef.onSnapshot((doc) => {
      setHistory(doc.data().history);
    });
  }, []);

  const renderItems = history.map((hist, idx) => {
    console.log(hist);
    return (
      <Text style={styles.text} key={idx}>
        {hist.info}
      </Text>
    );
  });

  return <View style={styles.container}>{renderItems}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#777',
  },
  text: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#333',
  },
});

export default UserHistory;
