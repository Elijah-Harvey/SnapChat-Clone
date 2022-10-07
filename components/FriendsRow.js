import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import FriendList from './FriendList';


const FriendsRow = () => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column'}}>
      <Text style={styles.text}>Friends</Text>
        <FriendList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    left: 10,
    top: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  column: {
    left: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FriendsRow;
