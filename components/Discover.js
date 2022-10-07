import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const Discover = ({ image, title }) => {
  return (
    <TouchableOpacity style={styles.bigBox}>
      <View>
        <Image style={styles.image} source={{ uri: image }} />
        <Text style={styles.bigTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  bigTitle: {
    color: 'ghostwhite',
    fontSize: 15,
    bottom: 20,
    left: 3,
    position: 'absolute',
    fontWeight: '600',
  },
  image: {
    height: 230,
    width: 130,
    borderRadius: 10,
    marginBottom: 10
  },
  bigBox: {
    height: 255,
    width: 130,
    marginRight: 10,
    borderRadius: 10,
    top: 20,
    marginBottom: 10,
  },
});

export default Discover;
