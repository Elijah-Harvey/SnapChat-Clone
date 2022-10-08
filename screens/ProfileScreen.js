import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { auth } from '../firebase';

const ProfileScreen = ({ navigation }) => {
  

  const handleSignOut = () => {
    auth.signOut().then(() => navigation.replace('LogIn')).catch(error => error.message)
  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Button title='Click' onPress={handleSignOut}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
