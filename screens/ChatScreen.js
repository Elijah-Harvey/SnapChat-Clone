import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { auth } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';

const ChatScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          borderTopColor: 'transparent',
          borderColor: 'lightgray',
          borderWidth: 1,
          height: '10%',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <View style={styles.circle}>
          <Image
            source={{ uri: route.params.image }}
            style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
          />
        </View>
        <Text style={{ fontSize: 20 }}>{route.params.name}</Text>
        <View
          style={{
            right: '30.5%',
            backgroundColor: 'lightgray',
            width: 50,
            height: 35,
            position: 'absolute',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="call" size={25} />
        </View>
        <View
          style={{
            right: '18%',
            backgroundColor: 'lightgray',
            width: 50,
            height: 35,
            position: 'absolute',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="videocam" size={25} />
        </View>
        <TouchableOpacity
          style={{ right: '5%', position: 'absolute' }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-forward" size={40} />
        </TouchableOpacity>
      </View>
      <Text>ChatScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    borderWidth: 1,
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
