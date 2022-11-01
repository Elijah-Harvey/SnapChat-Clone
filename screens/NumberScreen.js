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
} from 'react-native';
import TouchableButton from '../components/TouchableButton';
import { auth, usersCollection } from '../firebase';

const { height } = Dimensions.get('window');

const NumberScreen = ({ navigation }) => {
  const [number, setNumber] = useState();

  const HandleNumber = () => {
    usersCollection.doc(auth.currentUser.uid).update({
      Number: number
    })
      .then(() => {
        console.log('success');
      })

      .catch((error) => alert('Number is invalid'));
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
          <Text style={{ fontSize: 25, position: 'absolute', top: '7%' }}>
            What's your mobile number?
          </Text>

          <Text
            style={{
              fontSize: 15,
              left: 40,
              color: '#6CA6DC',
              position: 'absolute',
              top: 130,
            }}
          >
            Username
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              top: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity>
              <TextInput
                placeholderTextColor={'black'}
                style={styles.smallinput}
                maxLength={2}
                keyboardType="number-pad"
                placeholder="+ 1"
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <TextInput
                placeholderTextColor={'black'}
                style={styles.input}
                maxLength={10}
                keyboardType="phone-pad"
                value={number}
                onChangeText={text => setNumber(text)}
                returnKeyType={ 'done' }               />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                // position: 'absolute',
                fontSize: 15,
                bottom: Platform.OS === 'android' ? '85%' : '87%',
              }}
            >
              We'll send you a text verification code.
            </Text>
          </View>
        </View>

        <TouchableButton text="Continue" onPress={HandleNumber} onPressIn={() => navigation.navigate('HomeNav')} disable={number === '' ? true : false} style={{backgroundColor: number === '' ? 'gray': '#10ACFF'}}/>
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
    width: Platform.OS === 'android' ? 220 : 270,
    borderWidth: 1,
    borderColor: 'gray',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    paddingLeft: 10,
    left: 20,
  },
  smallinput: {
    height: 40,
    width: 60,
    borderWidth: 1,
    borderColor: 'gray',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    paddingLeft: 10,
    left: 0,
    fontSize: 20,
  },
  button: {
    bottom: 10,
  }
});

export default NumberScreen;
