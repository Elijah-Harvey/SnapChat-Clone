import React from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function OnBoardingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: `#FFFB53` }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../assets/snapchatlogo.png')}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E04D5C',
            width: 450,
            height: 50,
          }}
          onPress={() => navigation.navigate('LogIn')}
        >
          <Text style={styles.text}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4FAAF9',
            width: 450,
            height: 50,
          }}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.text}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
});

export default OnBoardingScreen;
