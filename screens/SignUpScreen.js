import React, { useState } from 'react';
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
  Image,
  Alert,
} from 'react-native';
import TouchableButton from '../components/TouchableButton';
import { auth, db, usersCollection } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuid } from 'uuid';

const { height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth.currentUser.updateProfile({
          displayName: name,
        });
      })
      .then(() => {
        usersCollection.doc(auth.currentUser.uid)
          .set({
            email: email,
            password: password,
            name: name,
            image: 'https://picsum.photos/200/300',
            uid: auth.currentUser.uid,
            date: new Date().toDateString()
          });
      })
      .then(() => navigation.navigate('HomeNav'))
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
    
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        enabled={false}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={height * 0.07}
      >
        <TouchableOpacity
          style={{ top: Platform.OS === 'android' ? '5%' : '1%', left: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={30} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 25, position: 'absolute', top: 55 }}>
            Sign Up
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            bottom: '45%',
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
            Name
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text
            style={{
              fontSize: 15,
              left: 40,
              color: '#6CA6DC',
            }}
          >
            Email
          </Text>
          <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            autoCapitalize={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text
            style={{
              fontSize: 15,
              left: 40,
              color: '#6CA6DC',
            }}
          >
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            keyboardType={'default'}
          />
        </View>
        <View
          style={{
            bottom: Platform.OS === 'android' ? '37%' : '40%',
            position: 'absolute',
            width: 300,
            height: 100,
            left: '11%',
          }}
        >
          <Text
            style={{
              color: 'gray',
              fontSize: Platform.OS === 'android' ? null : 18,
            }}
          >
            By tapping "Sign Up & Accept". you acknowledge that you have read
            the <Text style={{ color: '#10ACFF' }}>Privacy Policy</Text> and
            agree to the
            <Text style={{ color: '#10ACFF' }}>Terms of Service</Text>.
          </Text>
        </View>
        <TouchableButton text="Sign up & Accept" onPress={handleSignUp} />
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

export default SignUpScreen;
