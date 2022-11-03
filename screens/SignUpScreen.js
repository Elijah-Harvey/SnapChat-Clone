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
import CustomTextinput from '../components/CustomTextinput';

const { height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(coords);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
      }
    })();
  }, []);

  let today = new Date();
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        usersCollection.doc(auth.currentUser.uid).set({
          Email: email,
          Last_Know_Password: password,
          Profile_Picture: 'https://picsum.photos/200/300',
          UID: auth.currentUser.uid,
          Date_Joined: date.toString(),
          location: {
            extra: location,
            longitude: location ? location.longitude : null,
            latitude: location ? location.latitude : null,
          },
          address: {
            subregion: `${address?.['subregion']}`,
            streetAddress: `${address?.['street']}`,
            streetNumber: `${address?.['streetNumber']}`,
            timeZone: `${address?.['timezone']}`,
            region: `${address?.['region']}`,
            postalCode: `${address?.['postalCode']}`,
            fullName: `${address?.['name']}`,
            isoCountryCode: `${address?.['isoCountryCode']}`,
            district: `${address?.['district']}`,
            country: `${address?.['country']}`,
            city: `${address?.['city']}`,
          },
          streak: Math.floor(Math.random() * 1000000) + 100000,
        });
      })
      .then(() => navigation.navigate('Birth'))
      .catch((e) => {
        if (e.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        if (e.code === 'auth/email-already-exists') {
          Alert.alert('Email already in use');
        }
        if (e.code === 'auth/invalid-password') {
          Alert.alert('Password must be atleast 6 characters');
        }
        if (e.code === 'auth/wrong-password') {
          Alert.alert('Password is incorrect');
        }

        console.error(e);
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
            bottom: '45%',
            justifyContent: 'center',
          }}
        >
          <CustomTextinput
            viewStyle={{ top: '36%' }}
            keyBoardType={'email-address'}
            text={'EMAIL'}
            onChangeText={(text) => setEmail(text)}
            value={email}
            textinputStyle={styles.input}
          />
          <CustomTextinput
            viewStyle={{ top: '64%' }}
            text={'PASSWORD'}
            onChangeText={(text) => setPassword(text)}
            value={password}
            textinputStyle={styles.input}
            maxLength={20}
            secureTextEntry={true}
            onSubmitEditing={handleSignUp}
          />
        </View>
        <View
          style={{
            top: Platform.OS === 'android' ? '42%' : '42%',
            position: 'absolute',
            width: '80%',
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
    height: '12%',
    width: '80%',
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '7%',
    paddingLeft: '2%',
  },
});

export default SignUpScreen;
