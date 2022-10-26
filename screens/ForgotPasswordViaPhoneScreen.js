import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { auth } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';

const ForgotPasswordViaPhoneScreen = ({ navigation}) => {
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(false);
  const [seconds, setSeconds] = useState(60);

  const forgotPassword = () => {
    if (email === '') {
      setDisable(false);
      Alert.alert('Email is invalid');
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            `  🎉 success 🎉

  Check your trash
       `
          )
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            setDisable(false);
            Alert.alert('That email address is invalid!');
          }
        });
    }
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setDisable(false);
      }
      if (seconds === 60) {
        setEmail('');
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: '5%', left: '3%' }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={30} />
        </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 30, bottom: 30, alignSelf: 'center' }}>
          Enter Your Email
        </Text>
        <Text style={{ alignSelf: 'center', fontSize: 12, bottom: 20 }}>
          {email}
        </Text>
      </View>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      {disable === false ? (
        <TouchableOpacity
          onPress={forgotPassword}
          onPressOut={() => setDisable(true)}
          onPressIn={() => setSeconds(60)}
          style={{
            marginBottom: 90,
            backgroundColor: disable === false ? '#4FAAF9' : 'lightgray',
            width: '70%',
            height: 75,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            top: 10,
          }}
        >
          <Text style={{ alignSelf: 'center', fontSize: 25, color: 'white' }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={seconds}
          style={{
            marginBottom: 90,
            backgroundColor: disable === false ? '#4FAAF9' : 'lightgray',
            width: '70%',
            height: 75,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ alignSelf: 'center', fontSize: 25, color: 'white' }}>
            Forgot Password {seconds === 0 ? null : <Text>{seconds}</Text>}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '50%',
    borderWidth: 1,
    borderColor: 'gray',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 25,
    textAlign: 'center',
  },
});

export default ForgotPasswordViaPhoneScreen;
