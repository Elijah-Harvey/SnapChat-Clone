import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const SavedInChat = ({ title, time, image }) => {
  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity style={styles.bigBox}>
        <View>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    flexDirection: 'column',
    left: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bigBox: {
    height: Platform.OS === 'android' ? 210 : 250,
    width: Platform.OS === 'android' ? 168 : '100%',
    marginRight: 10,
    borderRadius: 10,
    // marginBottom: 15,
  },
  bigTitle: {
    color: 'white',
    fontSize: 25,
    bottom: 40,
    left: 10,
    position: 'absolute',
    fontWeight: 'bold',
  },
  bigText: {
    fontSize: 20,
    bottom: 15,
    left: 25,
    position: 'absolute',
    color: 'black',
  },
  image: {
    height: Platform.OS === 'android' ? 210 : 250,
    width: Platform.OS === 'android' ? 168 : '100%',
    borderRadius: 10,
  },
});

export default SavedInChat;
