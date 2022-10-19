import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TouchableButton from '../components/TouchableButton';
import { auth } from '../firebase';
import { useCountdown } from '../hooks/useCountdown';

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(false);
  const [seconds, setSeconds] = useState(60);


  const forgotPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('reset email sent to ' + email);
      })
      .catch(() => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
      });
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setDisable(false) 
      }
      if (seconds === 60 ) {
        setEmail('')
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <View style={styles.container}>
      <Text>Enter Your Email: {email}</Text>
      <TextInput
        autoCapitalize='none'
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
            marginBottom: 100,
            backgroundColor: disable === false ? '#4FAAF9' : 'lightgray',
            width: '70%',
            height: 75,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Forgot Password</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={seconds}
          style={{
            marginBottom: 100,
            backgroundColor: disable === false ? '#4FAAF9' : 'lightgray',
            width: '70%',
            height: 75,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>
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
    height: 40,
    width: '50%',
    borderWidth: 1,
    borderColor: 'gray',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    paddingLeft: 10,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
