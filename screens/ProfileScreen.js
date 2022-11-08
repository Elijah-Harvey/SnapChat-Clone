import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { auth, usersCollection } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import ProfileBox from '../components/ProfileBox';
import Ionicons from '@expo/vector-icons/Ionicons';
import RandomStreak from '../components/RandomStreak';

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

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => navigation.replace('LogIn'))
  //     .catch((error) => error.message);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, width: '100%' }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '35%',
              alignSelf: 'center',
            }}
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
        </View>
        <View style={{ alignItems: 'center' }}>
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: '3%',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '5%',
            paddingLeft: '20%',
            paddingRight: '20%',
          }}
        >
          <Text style={{ fontWeight: '600' }}>
            {auth.currentUser.displayName
              ? `@${auth.currentUser.displayName}`
              : auth.currentUser.email}
          </Text>
          <Text style={{ color: 'gray' }}>-</Text>
          <Text style={{ fontWeight: '600' }}>{RandomStreak()}</Text>
          <Text style={{ color: 'gray' }}>-</Text>
          <Ionicons
            name="reorder-three-outline"
            size={'25%'}
            style={{ bottom: '1%', fontWeight: '600' }}
          />
        </View>
        <ProfileBox
          iconName={'document-outline'}
          iconName2="close-outline"
          title={'Find friends on Snapchat'}
          subTitle={'Tap to sync your contacts'}
          subTitleShow={true}
          styleTitle={true}
        />
        <View style={{ top: '3%', left: '5%', flexDirection: 'row' }}>
          <Text style={{ fontSize: '20%', fontWeight: '600' }}>Stories</Text>
          <View
            style={{
              top: '3%',
              right: '7%',
              flexDirection: 'row',
              position: 'absolute',
              backgroundColor: '#e8edf2',
              width: '25%',
              alignItems: 'center',
              borderRadius: '10%',
              height: '100%',
            }}
          >
            <Ionicons
              name="add"
              size={20}
              style={{ left: '20%', color: '#4FAAF9' }}
            />
            <Text style={{ fontSize: '15%', fontWeight: '600', left: '20%' }}>
              New Story
            </Text>
          </View>
        </View>
        <ProfileBox
          style={{ top: '4%' }}
          iconColor="#4FAAF9"
          iconName={'camera-outline'}
          iconName2="ellipsis-vertical-outline"
          title={'Add to My Story'}
          styleTitle={{ alignSelf: 'center' }}
        />
        <ProfileBox
          style={{ top: '8%' }}
          iconColor="#4FAAF9"
          iconName={'camera-outline'}
          iconName2="ellipsis-vertical-outline"
          title={'Add to Our Story'}
          styleTitle={{ alignSelf: 'center' }}
        />
        <View style={{ top: '3%', left: '5%', flexDirection: 'row' }}>
          <Text style={{ fontSize: '20%', fontWeight: '600', top: '8%' }}>
            Friends
          </Text>
        </View>

        <ProfileBox
          onPress={() => navigation.navigate('AddFriend')}
          style={{ top: '13%' }}
          iconName={'person-add-outline'}
          iconName2="chevron-forward-outline"
          title={'Add Friends'}
          styleTitle={{ alignSelf: 'center' }}
          iconStyle={{ transform: [{ rotateY: '180deg' }] }}
        />

        <ProfileBox
          style={{ top: '15%', height: '45%' }}
          iconName={'people-circle-outline'}
          iconName2="chevron-forward-outline"
          title={'My Friends'}
          styleTitle={{ bottom: '11%' }}
          iconStyle={{ bottom: '5%', position: 'absolute', left: '4%' }}
          iconStyle2={{ bottom: '5%', position: 'absolute', right: '4%' }}
          imageShow={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default ProfileScreen;
