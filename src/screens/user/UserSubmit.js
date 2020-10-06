import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import {
  firebase_instance,
  firebase_storage_ref,
  firestore,
} from '../../database/firebaseDB';
import FormButton from '../../components/FormButton';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { AuthContext } from '../../navigations/AuthProvider';

const UserSubmit = () => {
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { user } = useContext(AuthContext);
  const activeDocRef = firestore.collection('active').doc(user.email);
  const saverDocRef = firestore.collection('savers').doc(user.email);

  const _requestCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location Permission is required');
    }

    let { coords } = await Location.getCurrentPositionAsync();

    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };

  const uploadImage = async (uri) => {
    const res = await fetch(uri);
    const blob = await res.blob();

    const ref = firebase_storage_ref.child(`images/${user.uid}.jpg`).put(blob);

    ref.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      console.log(`Donwload URL = ${downloadURL}`);
    });

    return ref;
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync();
    console.log({ result });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    const res = await uploadImage(image);
    const { bucket, fullPath } = res.metadata;
    const photo_url = `gs://${bucket}/${fullPath}`;
    await _requestCurrentLocation();
    console.log(latitude, longitude);
    await activeDocRef.set({
      user_id: user.uid,
      email: user.email,
      photo_url,
      info,
      accepted: false,
      completed: false,
      location: new firebase_instance.firestore.GeoPoint(latitude, longitude),
    });
    await saverDocRef.update({ active: true });
    setImage(null);
    setInfo('');
  };

  return (
    <View style={styles.contatiner}>
      <Text>{user.email}</Text>
      {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
      <Button title='Take Photo' onPress={takePhoto} />

      <TextInput
        value={info}
        style={styles.input}
        placeholder='Enter Information'
        placeholderTextColor='#666'
        numberOfLines={3}
        onChangeText={(textInfo) => setInfo(textInfo)}
      />

      <FormButton buttonTitle='Upload' onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  contatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    margin: 10,
  },
  input: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 10,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default UserSubmit;
