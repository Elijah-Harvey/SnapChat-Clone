import { View, Text } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';

const SenderMessage = ({ message, text, setcolor, time }) => {
  return (
    <View style={{ left: 10, bottom: '5%' }}>
      <View style={{ top: '100%', position: 'absolute' }}>
        <Text
          style={{
            fontSize: 17,
            color: setcolor,
            position: 'absolute',
            top: Platform.OS === 'android' ? -90 : -85,
          }}
        >
          {text}
        </Text>
      </View>
      <View
        style={{
          borderLeftWidth: 3,
          marginBottom: 10,
          padding: 10,
          borderLeftColor: '#E04D5C',
          backgroundColor: '#ededed',
          flexDirection: 'column',
          width: '70%',
          marginTop: '6%',
        }}
      >
        <Text
          style={{ color: 'black', fontSize: 20, flex: 1, flexWrap: 'wrap' }}
        >
          {message.message}
        </Text>
        <Text style={{ fontSize: 8, color: 'black', fontWeight: '500' }}>
          {time}
        </Text>
      </View>
    </View>
  );
};

export default SenderMessage;
