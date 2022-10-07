import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const HappeningNow = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '600',
            left: 10,
          }}
        >
          Happening Now
        </Text>
        <Text
          style={{
            color: 'gray',
            fontSize: 10,
            fontWeight: '600',
            top: 5,
            left: 10,
          }}
        >
          Sunday, May 24
        </Text>
      </View>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="logo-snapchat" size={15} color="ghostwhite" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    position: 'absolute',
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
});

export default HappeningNow;
