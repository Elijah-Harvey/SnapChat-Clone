import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Button,
} from 'react-native';
import TouchableButton from '../components/TouchableButton';
import { AddFriendCollection, auth, usersCollection } from '../firebase';
import CustomTextinput from '../components/CustomTextinput';

const { height } = Dimensions.get('window');

const UsernameScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [disable, setDisable] = useState(true);

  const update = {
    displayName: `${name}`,
  };

  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser.updateProfile(update);
    }
  }, [name]);

  useEffect(() => {
    if (name.trim()) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name]);

  const handleUsername = () => {
    auth.currentUser
      .updateProfile(update)
      .then(() => {
        usersCollection
          .doc(auth.currentUser.uid)
          .update({
            name: `@${name}`,
          })
          .then(() => {
            console.log('success');
          });
      })
      .then(() => {
        AddFriendCollection.doc(auth.currentUser.uid).update({
          name: `${name}`,
        });
      })
      .then(() => navigation.navigate('Number'))
      .catch((error) => alert('Something went wrong try again'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        enabled={false}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={height * 0.07}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 25, position: 'absolute', top: 55 }}>
            Your Username?
          </Text>
          <CustomTextinput
            viewStyle={{ top: '32%', height: '1%' }}
            textstyle={{ width: '80%', position: 'absolute', top: '25%' }}
            keyBoardType={'email-address'}
            text={'USERNAME'}
            onChangeText={(text) => setName(text)}
            value={name}
            textinputStyle={styles.input}
          />
        </View>

        <TouchableButton
          text="Continue"
          onPress={handleUsername}
          disable={disable}
          style={{
            backgroundColor: disable === true ? 'lightgray' : '#4FAAF9',
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    position: 'absolute',
    width: '76%',
    top: '30.6%',
    
    
  },
});

export default UsernameScreen;
