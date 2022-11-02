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
import { auth, usersCollection } from '../firebase';

import Ionicons from '@expo/vector-icons/Ionicons';
import CustomTextinput from '../components/CustomTextinput';

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('HomeNav')
        // .then(() => {
        //   usersCollection.doc(auth.currentUser.uid).update({
        //     Last_Know_Password: password
        //   })
        // });
      }
    });
    return unsubscribe;
  }, [auth]);

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
            bottom: '45%',
            justifyContent: 'center',
          }}
        >
          <CustomTextinput
            viewStyle={{ top: Platform.OS === 'android' ? '38%' : '40%' }}
            keyBoardType={'email-address'}
            text={'USERNAME OR EMAIL'}
            onChangeText={(text) => setEmail(text)}
            value={email}
            textinputStyle={styles.input}
          />
          <CustomTextinput
            viewStyle={{ top: Platform.OS === 'android' ? '66%' : '67%' }}
            text={'PASSWORD'}
            onChangeText={(text) => setPassword(text)}
            value={password}
            textinputStyle={styles.input}
            maxLength={20}
            secureTextEntry={true}
            onSubmitEditing={handleLogin}
          />
        </View>
        <View
          style={{
            top: Platform.OS === 'android' ? '42%' : '43%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('PasswordViaEmail')}
          >
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
    height: '12%',
    width: '80%',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 20,
    paddingLeft: '2%',
  },
});

export default LoginScreen;
