import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const NewSnapEmoji = (props) => {
  return (
    <View style={styles.newSnap}>
      <View style={styles.container} />
      <Text style={styles.text}>New Snap</Text>
      <Text style={{color: 'darkgray', fontWeight: '800'}}>- </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'violet',
    width: 15,
    height: 15,
    backgroundColor: 'violet',
    borderRadius: 6,
  },
  newSnap: {
    flexDirection: 'row',
  },
  text: {
    left: 5,
    color: 'violet',
    marginRight: 10,
  },
});

export default NewSnapEmoji;
