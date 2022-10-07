import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const WeatherBox = (props) => {
  return (
    // <View style={{marginBottom: 100, flexDirection: 'row'}}>
    <TouchableOpacity style={styles.weatherBox}>
      <View
        style={{
          top: 5,
          left: 5,
          width: 70,
          height: 70,
          borderRadius: 70 / 2,
          borderColor: '#F1EE12',
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#5BC798',
        }}
      >
        <Ionicons name="cloud" color={'white'} size={50} />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            left: 20,
            top: 10,
            flex: 1,
            width: 230,
          }}
        >
          <Ionicons name="checkbox-outline" size={15} color="white" />
          <Text style={{ fontWeight: '600', color: 'white' }}> Weather </Text>
          <Text style={{ color: 'white' }}>- Local News</Text>
          <Text style={{ left: 230, position: 'absolute', color: 'lightgray' }}>
            1h
          </Text>
        </View>
        <Text
          style={{
            left: 20,
            top: 30,
            position: 'absolute',
            fontSize: 13,
            color: 'white',
          }}
        >
          Today's high is 44° with a low of 39°. Tap for your personalized
          forecast.
        </Text>
      </View>
    </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  weatherBox: {
    height: 80,
    width: '100%',
    marginRight: 10,
    borderRadius: 10,
    top: 20,
    marginBottom: 40,
    backgroundColor: 'gray',
    flexDirection: 'row',
  },
});

export default WeatherBox;
