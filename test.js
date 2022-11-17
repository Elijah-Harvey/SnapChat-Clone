import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { usersCollection } from './firebase';

const test = usersCollection.get().then(
  (snapshot) => console.log(snapshot.docs.length)
);



export default test;
