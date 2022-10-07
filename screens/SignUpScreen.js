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

const { height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
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
            What Your Name?
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
            First Name
          </Text>
          <TextInput
            style={styles.input}
            keyboardType={
              Platform.OS === 'ios' ? 'ascii-capable' : 'email-address'
            }
          />
          <Text
            style={{
              fontSize: 15,
              left: 40,
              color: '#6CA6DC',
            }}
          >
            Last Name
          </Text>
          <TextInput
            style={styles.input}
            keyboardType={
              Platform.OS === 'ios' ? 'ascii-capable' : 'email-address'
            }
          />
        </View>
        <View
          style={{
            top: Platform.OS === 'android' ? '42%' : '41%',
            position: 'absolute',
            width: 300,
            height: 100,
            left: '11%',
          }}
        >
          <Text style={{color: 'gray', fontSize: Platform.OS === 'android' ? null : 18}}>
            By tapping "Sign Up & Accept". you acknowledge that you have read
            the <Text style={{ color: '#10ACFF' }}>Privacy Policy</Text> and
            agree to the
            <Text style={{ color: '#10ACFF' }}>Terms of Service</Text>.
          </Text>
        </View>
        <TouchableButton
          text="Sign up & Accept"
          onPress={() => navigation.navigate('Birth')}
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

export default SignUpScreen;
