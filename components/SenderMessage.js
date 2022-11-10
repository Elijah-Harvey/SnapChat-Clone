import { View, Text, Image } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const SenderMessage = ({
  message,
  text,
  setcolor,
  time,
  borderLeftColor,
  map,
  long,
  lat,
  region,
  color,
}) => {
  return (
    <View
      style={{
        left: 10,
        alignItems: 'flex-start',
        marginTop: '5%',
      }}
    >
      <Text style={{ fontWeight: '600', fontSize: 17, color, bottom: '4%' }}>
        {text}
      </Text>
      <View
        style={{
          borderLeftWidth: 3,
          marginBottom: '1.5%',
          padding: '2.5%',
          borderLeftColor: borderLeftColor,
          backgroundColor: '#ededed',
          width: '70%',
        }}
      >
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
