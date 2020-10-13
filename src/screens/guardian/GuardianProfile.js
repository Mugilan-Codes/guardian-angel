import React, { useEffect, useContext, useState } from "react";
// import { Text, View, Button, StyleSheet } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { firestore } from "../../database/firebaseDB";
import { AuthContext } from "../../navigations/AuthProvider";

const GuardianProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({});
  const { user, logout } = useContext(AuthContext);
  const guardianDocRef = firestore.collection("guardians").doc(user.email);
  useEffect(() => {
    guardianDocRef.get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        setProfile(doc.data());
      }
    });
  });
  return (
    // <View style={styles.container}>
    //   <Text>Profile Page</Text>
    //   <Text>{user.email}</Text>
    //   <Button title="Log-Out" onPress={logout} />
    // </View>
    <View>
      <Text style={styles.text}>Hii there!</Text>
      <Text style={styles.texts}>We are happy to have you on board</Text>
      <Card>
        <Card.Title>Guardian's Profile</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>Email: {user.email}</Text>
        <Text style={{ marginBottom: 10 }}>
          Phone Number:{profile.phone_number}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Vehicle Number:{profile.vehicle_number}
        </Text>
        <Button
          buttonStyle={{
            borderRadius: 5,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Log out"
          onPress={logout}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    backgroundColor: "deepskyblue",
    paddingTop: 20,
    paddingLeft: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  texts: {
    fontSize: 24,
    backgroundColor: "deepskyblue",
    paddingLeft: 20,
    justifyContent: "center",
    textAlign: "center",
  },
});
export default GuardianProfile;
