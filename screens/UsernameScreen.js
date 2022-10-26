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
import { auth, chatCollection, db, usersCollection } from '../firebase';

const { height } = Dimensions.get('window');

const UsernameScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [disable, setDisable] = useState(false);

  const update = {
    displayName: name,
  };

  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser.updateProfile(update);
    }
  }, [name]);

  useEffect(() => {
    if (name === '') {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }, [name])

  const handleUsername = () => {
    auth.currentUser
      .updateProfile(update)
      .then(() => {
        usersCollection
          .doc(auth.currentUser.uid)
          .update({
            name: name,
          })
          .then(() => {
            console.log('success');
          });
      })
      .catch((error) => alert('Something went wrong try again'));
  };

  console.log(usersCollection
    .doc(auth.currentUser.uid))

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
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            bottom: '50%',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 15,
              left: 40,
              color: '#6CA6DC',
            }}
          >
            Username
          </Text>
          <TouchableOpacity>
            <TextInput
              placeholderTextColor={'black'}
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </TouchableOpacity>
        </View>

        <TouchableButton
          text="Continue"
          onPressIn={() => navigation.navigate('Number')}
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
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    paddingLeft: 10,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
});

export default UsernameScreen;
