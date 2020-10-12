import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { firebase_instance, firestore } from "../../database/firebaseDB";
import { AuthContext } from "../../navigations/AuthProvider";

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");

  const { user } = useContext(AuthContext);

  const docRef = firestore.collection("savers").doc(user.email);

  useEffect(() => {
    docRef.onSnapshot((doc) => {
      setHistory(doc.data().history);
    });
  }, []);

  const renderItems = history ? (
    history.map((hist, idx) => {
      console.log(hist);
      const ref = firebase_instance.storage().refFromURL(hist.photo_url);
      ref.getDownloadURL().then(function (url) {
        setDownloadUrl(url);
      });
      const logo = {
        uri: downloadUrl,
        width: 100,
        height: 100,
      };
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#fff",
            elevation: 10,
            margin: 10,
            padding: 10,
          }}
          key={idx}
        >
          <View>
            <Text>Name: {hist.guardian_name}</Text>
            <Text>Email: {hist.guardian_email}</Text>
            <Text>Phone Number: {hist.guardian_phone_number}</Text>
            <Text>Vehicle Number: {hist.guardian_vehicle_number}</Text>
            <Text>INFO: {hist.info}</Text>
          </View>
          <View>
            <Image source={logo} />
          </View>
        </View>
      );
    })
  ) : (
    <Text style={styles.text}>No history yet</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 40, textAlign: "center", margin: 10 }}>
        User History
      </Text>
      <ScrollView>{renderItems}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#777',
  },
  text: {
    fontSize: 25,
    fontStyle: "italic",
    color: "#333",
    textAlign: "center",
    marginTop: 50,
  },
});

export default UserHistory;
