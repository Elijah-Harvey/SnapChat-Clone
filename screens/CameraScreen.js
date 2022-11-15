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
import { v4 as uuid } from 'uuid';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, PictureCollection, Storage, usersCollection } from '../firebase';

export default function CameraScreen({ navigation, text, onOK }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [disable, setDisable] = useState(false);
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

  const savePicture = async () => {
    if (image != null) {
      try {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', image, true);
          xhr.send(null);
        });
        const imageNameBefore = image.split('/');
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        const ref = Storage.ref().child(
          `${auth.currentUser.uid}/images/${imageName}`
        );
        const snapshot = await ref.put(blob);
        blob.close();
        const downloadedURL = (await snapshot.ref.getDownloadURL()).toString();
        return usersCollection
          .doc(auth.currentUser.uid)
          .collection('Pics')
          .add({
            pic: downloadedURL,
            id: uuid(),
          })
          .then(() => {
            PictureCollection.add({
              pic: downloadedURL,
              id: uuid(),
              owner: auth.currentUser.uid,
            });
          })
          .then(await snapshot.ref.getDownloadURL())
          .then(() => setImage(null))
          .then(() => setDisable(false));
      } catch (e) {
        console.log(e);
      }
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
          <SafeAreaView style={styles.Header}>
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
            <View
              style={{
                flexDirection: 'row',
                paddingRight: '3%',
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
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
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              >
                <Ionicons name={'repeat-outline'} size={35} color={'white'} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <View
            style={{
              alignSelf: 'flex-end',
              paddingRight: '3%',
            }}
          >
            <TouchableOpacity
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
        </Camera>
      ) : (
        // <Image source={{ uri: image }} style={styles.camera} />

        <Image
          resizeMode={'cover'}
          style={styles.camera}
          source={{ uri: image }}
        ></Image>
      )}
      <View>
        {image ? (
          <View
            style={{
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              justifyContent: 'space-between',
              paddingLeft: '43%',
            }}
          >
            <View>
              <TouchableOpacity onPress={() => setImage(null)}>
                <Ionicons name="reload-outline" size={60} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={savePicture}
                onPressOut={() => setDisable(true)}
                disabled={disable}
              >
                <View style={{}}>
                  <Ionicons
                    name="arrow-redo-outline"
                    size={50}
                    color={disable === true ? 'red' : 'white'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              bottom: '20%',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: '20%',
              paddingRight: '20%',
            }}
          >
            <TouchableOpacity style={styles.pictureIcon}>
              <Ionicons name="images-outline" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.picture} onPress={takePicture} />
            <TouchableOpacity style={styles.happy}>
              <Ionicons name="happy-outline" size={45} color="white" />
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
    width: '100%',
    height: '100%',
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderColor: 'white',
    borderWidth: 3,
  },
  pictureIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  happy: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleCamera: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '2%',
    marginBottom: '2%',
  },
  search: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '7%',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFriend: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight: '7%',
  },
  ellipsis: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
