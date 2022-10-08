import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import TouchableButton from '../components/TouchableButton';
import { auth } from '../firebase';

import Ionicons from '@expo/vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('HomeNav');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with: ', user.email);
      })
      .catch((error) => alert(error.message));
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
          <Text style={{ fontSize: 25, position: 'absolute', top: '10%' }}>
            Log In
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
            USERNAME OR EMAIL
          </Text>
          <TextInput
            autoCapitalize={false}
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType={'email-address'}
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
            autoCapitalize={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry={true}
            maxLength={20}
          />
        </View>
        <View
          style={{
            top: Platform.OS === 'android' ? 310 : 350,
            position: 'absolute',
            width: 300,
            height: 100,
            left: Platform.OS === 'android' ? 20 : 70,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Password')}>
            <Text
              style={{
                color: '#10ACFF',
                fontSize: Platform.OS === 'android' ? null : 18,
              }}
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableButton text="Log In" onPress={handleLogin} />
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

export default LoginScreen;
