import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const TouchableButton = ({ text, onPress, onPressIn }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress} onPressIn={onPressIn}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 70,
  },
  button: {
    width: '70%',
    height: 75,
    borderRadius: 50,
    backgroundColor: '#10ACFF',
    justifyContent: 'center',
    position: 'absolute',
  },
  text: {
    alignSelf: 'center',
    fontSize: 25,
    color: 'white',
  },
});

export default TouchableButton;
