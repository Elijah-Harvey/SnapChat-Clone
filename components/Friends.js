import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const Friends = ({ name, image, onPress, nav }) => {
  return (
    <View style={styles.column}>
      <TouchableOpacity style={styles.profile} onPress={onPress}>
        <Image style={styles.image} source={{ uri: image }} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    left: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  profile: {
    width: 78,
    height: 78,
    borderRadius: 78 / 2,
    borderColor: 'purple',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Friends;
