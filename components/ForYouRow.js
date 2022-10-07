import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ForYouList from './ForYouList';

const ForYouRow = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          marginBottom: 12,
        }}
      >
        <Text style={styles.title}>For You </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <ForYouList />
      </View>
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
  bigTitle: {
    color: 'white',
    fontSize: 30,
    bottom: 70,
    right: 15,
    fontWeight: 'bold',
  },
  bigText: {
    fontSize: 20,
    bottom: 65,
    right: 55,
    color: 'black',
  },
  image: {
    height: 260,
    width: 200,
    borderRadius: 10,
  },
});

export default ForYouRow;
