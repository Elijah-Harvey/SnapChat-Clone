import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Camera, CameraType, Constants } from 'expo-camera';
import * as MedialLibrary from 'expo-media-library';
import * as Permission from 'expo-permissions';

import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, Storage, usersCollection } from '../firebase';

export default function CameraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [file, setFile] = useState('');
  const [url, setURL] = useState('');

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      MedialLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      if (cameraStatus.status === 'granted') {
        setLoaded(false);
      } else {
        setLoaded(true);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  let substringTest = function (str) {
    return str.substring(str.lastIndexOf('/') + 1);
  };

  const savePicture = async () => {
    if (image != null) {
      try {
        const response = await fetch(image);
        console.log(response);

        const blob = response.blob();
        const filename = substringTest(image);
        Storage.ref()
          .child(`/images/${filename}`)
          .put(blob)
          .on('state_changed', () => {
            Storage.ref()
              .child(`/images/${filename}`)
              .getDownloadURL()
              .then((url) => {
                setURL(url);
              });
          });
      } catch (e) {
        console.log(e);
      }
      usersCollection.doc(auth.currentUser.uid).collection('Pics').add({
        pics: url,
      });
      setImage(null);
      setURL('');
    } else {
      <ActivityIndicator />;
    }
  };

  if (hasCameraPermission === false) {
    return <Text>Permission Denied</Text>;
  }

  return (
    <View style={styles.cameraContainer}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
          ratio={'16:9'}
        >
          <View style={styles.Header}>
            <TouchableOpacity
              style={styles.profilePic}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image
                source={{
                  uri: !auth.currentUser.photoURL
                    ? 'https://picsum.photos/200/300'
                    : auth.currentUser.photoURL,
                }}
                style={{ width: 45, height: 45, borderRadius: 45 / 2 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.search}>
              <Ionicons name="search-outline" size={35} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addFriend}>
              <Ionicons name="person-add-outline" size={35} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ellipsis}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <Ionicons name={'repeat-outline'} size={35} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flash}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            >
              {flash === Camera.Constants.FlashMode.off ? (
                <Ionicons
                  name={'flash-off-outline'}
                  size={35}
                  color={'white'}
                />
              ) : (
                <Ionicons name={'flash-outline'} size={35} color={'white'} />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 30,
            }}
          ></View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View style={{ flex: 1 }}>
            <View style={{ bottom: '10%', left: '43%', position: 'absolute' }}>
              <TouchableOpacity onPress={() => setImage(null)}>
                <Ionicons name="reload-outline" size={60} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={savePicture}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 7,
                    left: '85%',
                  }}
                >
                  <Ionicons name="arrow-redo-outline" size={45} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity style={styles.picture} onPress={takePicture} />
            <TouchableOpacity style={styles.pictureIcon}>
              <Ionicons name="images-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.happy}>
              <Ionicons name="happy-outline" size={33} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  camera: {
    flex: 1,
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderColor: 'white',
    borderWidth: 3,
    position: 'absolute',
    bottom: 30,
    flex: 1,
    alignSelf: 'center',
  },
  pictureIcon: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 50 : 50,
    left: Platform.OS === 'android' ? 85 : 110,
    flex: 1,
    alignSelf: 'center',
  },
  happy: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 50 : 50,
    right: Platform.OS === 'android' ? 85 : 110,
    flex: 1,
    alignSelf: 'center',
  },
  toggleCamera: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'android' ? 45 : '15%',
  },
  search: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    position: 'absolute',
    left: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    position: 'absolute',
    left: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFriend: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    position: 'absolute',
    right: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  ellipsis: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    position: 'absolute',
    right: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  flash: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    position: 'absolute',
    right: 25,
    top: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
