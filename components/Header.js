import React, { useState } from 'react';
import Constants from 'expo-constants';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../firebase';

const Header = ({ title, rightIcon, color, onPress, navigation }) => {
  const [image, setImage] = useState(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.Header}>
        <View style={styles.title}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.profilePic} onPress={onPress}>
          <Image
            Image
            source={{ uri: 'https://picsum.photos/200/300' }}
            style={{ width: 45, height: 45, borderRadius: 45 / 2 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.search}>
          <Ionicons name="search-outline" size={25} color={color} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addFriend}>
          <Ionicons name="person-add-outline" size={25} color={color} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ellipsis}>
          <Ionicons name={rightIcon} size={25} color={color} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'android' ? '5%' : '7%',
    marginBottom: '14%',
  },
  search: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    position: 'absolute',
    left: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
  },
  addFriend: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    position: 'absolute',
    right: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  ellipsis: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  title: {
    position: 'absolute',
  },
});

export default Header;
