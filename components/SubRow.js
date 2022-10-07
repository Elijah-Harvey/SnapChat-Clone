import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SubList from './SubList'

const SubRow = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 12,
        }}
      >
        <Text style={styles.title}>Subscriptions </Text>
        <Ionicons name="chevron-forward-outline" size={20} style={{ top: 3 }} />
      </View>
      
      <SubList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    flexDirection: 'column',
    left: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
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
    bottom: 50,
    right: 30,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 10,
    bottom: 40,
    right: 25,
    color: 'black',
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 10,
  },
});

export default SubRow;
