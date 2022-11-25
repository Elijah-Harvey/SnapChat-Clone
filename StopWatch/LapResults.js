import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { displayTime } from './DisplayTime';

function LapResults({ results }) {
  return (
    <ScrollView
      style={{
        borderWidth: 1,
        top: 10,
        width: '90%',
        height: '40%',
        alignSelf: 'center',
        borderColor: 'white',
      }}
    >
      <View>
        {results.map((item, index) => (
          <View key={index} style={{ marginLeft: 10, marginTop: 5 }}>
            <Text style={{ color: 'lightgreen' }}>
              Lap {results.length - index}:{' '} 
              <Text style={{ color: 'white' }}>{displayTime(item)}</Text>
            </Text>

            <Text></Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default React.memo(LapResults);
