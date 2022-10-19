import { View, Text } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';

const SenderMessage = ({ message, text, setcolor }) => {
  return (
    <View style={{ left: 10 }}>
      <View style={{ top: '100%', position: 'absolute', }}>
        <Text style={{ fontSize: 17 , color: setcolor}}>{text}</Text>
      </View>
      <View
        style={{
          borderLeftWidth: 3,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          width: '40%',
          borderLeftColor: '#E04D5C',
          backgroundColor: '#ededed',
          flexDirection: 'row',
          width: '70%',
          marginTop: '6%',
        }}
      >
        <Text
          style={{ color: 'black', fontSize: 20, flex: 1, flexWrap: 'wrap' }}
        >
          {message.message}
        </Text>
      </View>
    </View>
  );
};

export default SenderMessage;
