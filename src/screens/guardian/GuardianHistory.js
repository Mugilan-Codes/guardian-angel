import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";

import { firestore, firebase_instance } from "../../database/firebaseDB";
import { AuthContext } from "../../navigations/AuthProvider";

const GuardianHistory = () => {
  const [history, setHistory] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");

  const { user } = useContext(AuthContext);

  const docRef = firestore.collection("guardians").doc(user.email);

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
        width: 75,
        height: 75,
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
            <Text style={{ color: "#333" }}>Email: {hist.user_email}</Text>
            <Text style={{ color: "#333" }}>Info: {hist.info}</Text>
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
        Guardian History
      </Text>
      <ScrollView>{renderItems}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontStyle: "italic",
    color: "#333",
    textAlign: "center",
    marginTop: 50,
  },
});

export default GuardianHistory;
