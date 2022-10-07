import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const Subscriptions = ({image, time, subTitle, }) => {
  return (
    <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity style={styles.smallBox}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={styles.image}
              source={{ uri: image }}
            />
            <Text style={styles.smallTitle}>{subTitle}</Text>
            <Text style={styles.smallText}>{time}</Text>
          </View>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  smallBox: {
    height: 200,
    width: 120,
    flexDirection: 'column',
    marginRight: 10,
    borderRadius: 10,
  },
  smallTitle: {
    color: 'white',
    fontSize: 20,
    bottom: 30,
    left: 2,
    fontWeight: 'bold',
    position: 'absolute',
  },
  smallText: {
    fontSize: 10,
    bottom: 20,
    right: 25,
    color: 'black',
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 10,
  },
});

export default Subscriptions;
