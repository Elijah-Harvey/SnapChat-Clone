import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title='Click' onPress={() => navigation.navigate('OnBoardNav')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileScreen;
