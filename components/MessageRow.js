import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import NewSnapEmoji from './NewSnapEmoji';

const MessageRow = ({ image, streak, name, onPress, onPressOut }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} onPressOut={onPressOut}>
      <Image
        style={styles.image}
        source={{ uri: image }}
      />
      <View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.bottomText}>
          <NewSnapEmoji />
          <Text style={{color: 'darkgray', fontWeight: '800'}}>2m - </Text>
          <Text>🔥 {streak}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginHorizontal: 3,
    marginVertical: 1,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    height: 80,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  name: {
    bottom: 10,
    fontSize: 23,
    left: 10,
  },
  bottomText: {
    flexDirection: 'row',
    left: 10,
  },
});

export default MessageRow;
