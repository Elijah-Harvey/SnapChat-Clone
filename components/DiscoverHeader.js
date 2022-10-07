import React from 'react';
import Constants from 'expo-constants';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const DiscoverHeader = ({ title, rightIcon, onPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.Header}>
        <View style={styles.title}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.profilePic} onPress={onPress}>
          <Image
            Image
            source={{ uri: 'https://picsum.photos/200/300' }}
            style={{ width: 45, height: 45, borderRadius: 45 / 2 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.search}>
          <Ionicons name="search-outline" size={25} color="ghostwhite" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ellipsis}>
          <Ionicons name={rightIcon} size={25} color="ghostwhite" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: '9%',
    marginBottom: '20%',
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
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    position: 'absolute',
    left: 10,
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
    color: 'white',
  },
});

export default DiscoverHeader;
