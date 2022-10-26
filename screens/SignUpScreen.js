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
  Alert,
} from 'react-native';
import TouchableButton from '../components/TouchableButton';
import { auth, usersCollection } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as Location from 'expo-location';

const { height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  let today = new Date();
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const handleSignUp = () => {
    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          usersCollection.doc(auth.currentUser.uid).set({
            Email: email,
            Last_Know_Password: password,
            Profile_Picture: 'https://picsum.photos/200/300',
            UID: auth.currentUser.uid,
            Date_Joined: date.toString(),
            location: text,
          });
        })
        .then(() => navigation.navigate('Birth'));
    } catch (e) {
      if (e.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
      if (e.code === 'auth/wrong-password') {
        Alert.alert('Password is incorrect');
      }

      console.error(e);
    }
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
            Email
          </Text>
          <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
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
            onSubmitEditing={handleSignUp}
          />
        </View>
        <View
          style={{
            top: Platform.OS === 'android' ? '42%' : '42%',
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
