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
} from 'react-native';
import { Camera, CameraType, Constants } from 'expo-camera';
import * as MedialLibrary from 'expo-media-library';



import Ionicons from '@expo/vector-icons/Ionicons';

export default function CameraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MedialLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
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
    if (image) {
      try {
        await MedialLibrary.createAssetAsync(image);
        alert('Success');
        setImage(null);
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
          <View style={styles.Header}>
            <TouchableOpacity style={styles.profilePic} onPress={() => navigation.navigate('Profile')}>
              <Image
                source={{ uri: 'https://picsum.photos/200/300' }}
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => setImage(null)}
              style={{ top: -70, left: '57%', position: 'absolute' }}
            >
              <Ionicons name="reload-outline" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePicture}
              style={{ top: Platform.OS === 'android' ? -640 : -750, left: '120%', position: 'absolute' }}
            >
              <Ionicons name="arrow-redo-outline" size={35} color="white" />
            </TouchableOpacity>
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
    backgroundColor: '#transparent',
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
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    position: 'absolute',
    left: 10,
    backgroundColor: 'transparent',
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