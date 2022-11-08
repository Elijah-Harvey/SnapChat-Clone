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

function OnBoardingScreen({ navigation }) {
  


  return (
    <View style={{ flex: 1, backgroundColor: `#FFFB53` }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          top: '20%',
        }}
      >
        <Image
          source={require('../assets/snapchatlogo.png')}
          style={{
            width: '30%',
            height: '30%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            backgroundColor: '#E04D5C',
            height: 50,
            width: '100%',
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
            width: '100%',
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
    bottom: 0,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
});

export default OnBoardingScreen;
