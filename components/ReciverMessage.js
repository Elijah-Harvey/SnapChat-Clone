import { View, Text, Platform } from 'react-native';
import React from 'react';

const ReciverMessage = ({ message, text, setcolor, time  }) => {
  return (
  <View style={{ left: 10}}>
      <View style={{ top: '100%', position: 'absolute',  }}>
        <Text style={{fontSize: 17, color: setcolor, position: 'absolute', top: Platform.OS === 'android' ? -90 : -85}}>{text}</Text>
      </View>
      <View
        style={{
          borderLeftWidth: 3,
          marginBottom: '1.5%',

          padding: '2.5%',
          borderLeftColor: '#4FAAF9',
          backgroundColor: '#ededed',
          width: '70%',
          marginTop: '6%',
        }}
      >
        <Text
          style={{ color: 'black', fontSize: 20, flex: 1, flexWrap: 'wrap' }}
        >
          {message.message}
        </Text>
        <Text style={{fontSize: 8, color:'black', fontWeight: '500'}}>{time}</Text>
      </View>
    </View>
  );
};

export default ReciverMessage;
