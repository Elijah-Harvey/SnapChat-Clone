import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const RandomStreak = () => {
  const UpdateStreak = (string) => {
    const num = parseInt(string);
    const newText = num.toLocaleString();
    return newText;
  };
  return UpdateStreak(Math.floor(Math.random() * 1000000) + 10000)
}

const styles = StyleSheet.create({
container: {}
})

export default RandomStreak;