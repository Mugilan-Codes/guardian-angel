import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
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
import MapView, { Callout } from 'react-native-maps';

const UserSubmit = () => {
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(false);

  const { user } = useContext(AuthContext);

  const activeDocRef = firestore.collection('active').doc(user.email);
  const saverDocRef = firestore.collection('savers').doc(user.email);

  useEffect(() => {
    _requestCurrentLocation();

    activeDocRef.onSnapshot((doc) => {
      if (doc.data()) {
        if (doc.data().accepted) {
          console.log('Trip Accepted');
        }

        if (doc.data().completed) {
          console.log(doc.data());
          const histObj = {
            photo_url: doc.data().photo_url,
            info: doc.data().info,
            location: doc.data().location,
            date: firebase_instance.firestore.FieldValue.serverTimestamp(),
            guardian: {
              email: doc.data().tracking.guardian_email,
              intial_location: doc.data().tracking.intial_location,
              name: doc.data().tracking.name,
              phone_number: doc.data().tracking.phone_number,
              vehicle_number: doc.data().tracking.vehicle_number,
            },
          };
          saverDocRef.update({
            active: false,
            history: firebase_instance.firestore.FieldValue.arrayUnion(histObj),
          });
        }
      }
    });

    saverDocRef.onSnapshot((doc) => {
      setActive(doc.data().active);
    });
  }, []);

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

    const ref = await firebase_storage_ref
      .child(`images/${user.uid}/${new Date().toISOString()}.jpg`)
      .put(blob);

    // ref.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //   console.log(`Donwload URL = ${downloadURL}`);
    // });

    return ref;
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync();
    // console.log({ result });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    const res = await uploadImage(image);
    const { bucket, fullPath } = res.metadata;
    const photo_url = `gs://${bucket}/${fullPath}`;
    console.log({ photo_url });
    await _requestCurrentLocation();
    console.log({ latitude, longitude });
    await activeDocRef.set({
      email: user.email,
      photo_url,
      info,
      accepted: false,
      completed: false,
      timestamp: firebase_instance.firestore.FieldValue.serverTimestamp(),
      location: new firebase_instance.firestore.GeoPoint(latitude, longitude),
    });
    await saverDocRef.update({ active: true });
    setImage(null);
    setInfo('');
    setModalVisible(!modalVisible);
  };

  // Create Modal for this update photo action
  return (
    <View style={styles.contatiner}>
      <Modal visible={modalVisible} animationType='slide'>
        <View style={styles.contatiner}>
          {/* <Text>{user.email}</Text> */}
          {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
          <Button title='Take Photo' onPress={takePhoto} />
          {/* <Text>
            Latitutde: {latitude} - Longitude: {longitude}
          </Text> */}
          <TextInput
            value={info}
            style={styles.input}
            placeholder='Enter Information'
            placeholderTextColor='#666'
            numberOfLines={3}
            onChangeText={(textInfo) => setInfo(textInfo)}
          />

          <FormButton buttonTitle='Upload' onPress={handleSubmit} />

          <TouchableOpacity
            style={styles.modalTouchable}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalTouchableText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
        showsUserLocation
        rotateEnabled={false}
        mapType='hybrid'
        onMapReady={_requestCurrentLocation}
      />
      {!active && (
        <Callout style={styles.calloutBtn}>
          <TouchableOpacity
            style={styles.touchableContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.touchableText}>Upload</Text>
          </TouchableOpacity>
        </Callout>
      )}
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
  mapStyle: {
    width: windowWidth,
    height: windowHeight / 1.05,
  },
  calloutBtn: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#3443df',
  },
  touchableContainer: {
    padding: 10,
  },
  touchableText: {
    fontSize: 24,
    color: '#fff',
  },
  modalTouchable: {
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#3443e4',
  },
  modalTouchableText: {
    fontSize: 20,
    color: '#fffeee',
  },
});

export default UserSubmit;
