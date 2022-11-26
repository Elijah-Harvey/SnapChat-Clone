import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { displayTime } from './DisplayTime';

function LapResults({ results, onPress }) {
  return (
    <ScrollView
      style={{
        borderWidth: 1,
        top: 10,
        width: '95%',
        height: '40%',
        alignSelf: 'center',
        borderColor: 'white',
        borderRadius: 40,
        // justifyContent: 'center'
      }}
    >
      <View style={{top: 20}}>
        {results.map((item, index) => (
          <View 
            key={index}
            onPress={onPress}
            style={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 40,
              width: '90%', alignItems: 'center', alignSelf: 'center',marginBottom: 10, 
              height: 40, justifyContent: 'center'
            }}
          >
            <Text style={{ color: 'lightgreen' }}>
              Lap {results.length - index}:{' '}
            </Text>
              <Text style={{ color: 'white' }}>{displayTime(item)}</Text>

          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default React.memo(LapResults);
