import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';

const AddFriendsRow = ({
  image,
  streak,
  name,
  onPress,
  onPressOut,
  onPressIn,
  nickName,
  onTap,
  text,
  styleText,
  styleTouch,

}) => {
  const [disable, setDisable] = useState(false);
  return (
    <View style={styles.row}>
      <Image
        style={styles.image}
        source={{ uri: 'https://picsum.photos/200/300' }}
      />

      <Text style={styles.name}>{name}</Text>
      <View style={styles.bottomText}>
        <Text style={{ color: 'gray' }}>{nickName}</Text>
      </View>
      {disable === false ? (
        <TouchableOpacity
          style={[
            {
              right: '15%',
              position: 'absolute',
              borderRadius: 20,
              height: '50%',
              width: '28%',
              alignItems: 'center',
              backgroundColor: '#ccc',
              flexDirection: 'row',
            },
            styleTouch,
          ]}
          onPressIn={onPressIn}
          onPressOut={() => setDisable(true)}
          onPress={onPress}
          disabled={disable}
        >
          <Ionicons
            name="person-add"
            size={20}
            style={{
              fontWeight: 'bold',
              color: 'black',
              left: '15%',
              position: 'absolute',
            }}
          />
          <Text
            style={[
              {
                fontWeight: '600',
                right: '25%',
                fontSize: 18,
                position: 'absolute',
              },
              styleText,
            ]}
          >
            {text}
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            right: '15%',
            position: 'absolute',
            borderRadius: 20,
            height: '50%',
            width: '28%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
              // position: 'absolute',
            }}
          >
            SENT
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{ position: 'absolute', right: '5%' }}
        onPress={onTap}
      >
        <Ionicons
          name="close-outline"
          size={27}
          style={{
            fontWeight: 'bold',
            color: 'gray',
          }}
        />
      </TouchableOpacity>
    </View>
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
    backgroundColor: '#fff',
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
    left: '22%',
    position: 'absolute',
    bottom: '15%',
  },
});

export default AddFriendsRow;
