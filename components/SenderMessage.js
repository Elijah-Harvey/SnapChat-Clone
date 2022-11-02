import { View, Text } from 'react-native';
import React from 'react';


const SenderMessage = ({ message, text, setcolor, time }) => {
  return (
    <View style={{ left: 10 }}>
      <View
        style={{
          borderLeftWidth: 3,
          marginBottom: '1.5%',
          padding: '2.5%',
          borderLeftColor: '#E04D5C',
          backgroundColor: '#ededed',
          width: '70%',
          marginTop: '6%',
        }}
      >
        <Text
          style={{
            fontSize: 17,
            color: setcolor,
            bottom: '10%'
          }}
        >
          {text}
        </Text>
        <Text
          style={{ color: 'black', fontSize: 20, flex: 1, flexWrap: 'wrap' }}
        >
          {message}
        </Text>
        <Text style={{ fontSize: 8, color: 'black', fontWeight: '500' }}>
          {time}
        </Text>
      </View>
    </View>
  );
};

export default SenderMessage;
