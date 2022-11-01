import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { auth, storage, usersCollection } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(auth.currentUser.photoURL);
  const [refreshing, setRefreshing] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const update = {
    photoURL: image,
  };

  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser.updateProfile(update).then(() => {
        usersCollection
          .doc(auth.currentUser.uid)
          .update({
            image: image,
          })
          // .then(async () => {
          //   await storage.refFromURL('gs://snapchat-clone-8d45b.appspot.com/' + auth.currentUser.uid).child(image).put()
          // })
          .then(() => {
            console.log('success');
          });
      });
    }
  }, [image]);



  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(200).then(() => setRefreshing(false));
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigation.replace('LogIn'))
      .catch((error) => error.message);
  };

 

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} on/>
        }
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onPress={pickImage}
          >
            <Image
              source={{
                uri:
                  image === null
                    ? 'https://picsum.photos/200/300'
                    : auth.currentUser.photoURL,
              }}
              style={{ height: 150, width: 150, borderRadius: 100 / 2 }}
            />
            <Image
            source={require('../assets/pngwing.com.png')} 
            style={{ height: 150, width: 150, position: 'absolute' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Text>Pull down to refresh</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => navigation.navigate('Change')}
        >
          <Text style={{ fontSize: 20 }}>
            {auth?.currentUser?.displayName
              ? auth?.currentUser?.displayName
              : auth?.currentUser?.email}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            height: 50,
            width: '70%',
            borderRadius: 10,
            backgroundColor: '#10ACFF',
          }}
        >
          <TouchableOpacity onPress={handleSignOut}>
            <Text
              style={{ fontSize: 25, color: 'ghostwhite', fontWeight: '600' }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
