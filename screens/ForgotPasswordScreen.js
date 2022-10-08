import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TouchableButton from '../components/TouchableButton';
import { auth } from '../firebase';

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    email ? setDisable(false) : setDisable(true);
  }, [email]);

  const forgotPassword = () => {
    auth.sendPasswordResetEmail(email)
    .then(() => {
      alert('reset email sent to ' + email);
    })
    .catch(function (e) {
      console.log(e);
    });
    console.log('reset email sent to ' + email);
  };

  return (
    <View style={styles.container}>
      <Text>Enter Your Email: {email}</Text>
      <TextInput
        autoCapitalize={false}
        style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
        keyboardType={'email-address'}
      />
      <Button title='reset password' onPress={forgotPassword} disabled={disable} >

      </Button>
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

export default ForgotPasswordScreen;
