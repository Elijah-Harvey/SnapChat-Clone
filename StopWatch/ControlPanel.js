import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Touchable,
} from 'react-native';

function ControlPanel({
  isRunning,
  handleLeftButtonPress,
  handleRightButtonPress,
  handleGoBack,
  handleCheckPoint,
}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          top: 10,
          justifyContent: 'space-evenly',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            width: 70,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 70,
            borderWidth: 1,
            borderColor: 'white',
          }}
        >
          <TouchableOpacity
            onPress={handleLeftButtonPress}
            style={{
              backgroundColor: 'lightgreen',
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 60,
            }}
          >
            <Text>{isRunning ? 'Lap' : 'Restart'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            width: 70,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 70,
            borderWidth: 1,
            borderColor: 'white',
          }}
        >
          <TouchableOpacity
            onPress={handleRightButtonPress}
            style={{
              backgroundColor: 'lightgreen',
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 60,
            }}
          >
            <Text>{isRunning ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            width: 70,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 70,
            borderWidth: 1,
            borderColor: 'white',
          }}
        >
          <TouchableOpacity
            onPress={handleGoBack}
            style={{
              backgroundColor: 'lightgreen',
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 60,
            }}
          >
            <Text>{'GoBack'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View
        style={{
          top: 30,
          width: '95%',
          borderRadius: 40,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'white',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            width: '97%',
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'white',
          }}
        >
          <TouchableOpacity
            onPress={handleCheckPoint}
            style={{
              backgroundColor: 'lightgreen',
              width: '100%',
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 60,
              borderWidth: StyleSheet.hairlineWidth
            }}
          >
            <Text>{'CheckPoint'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    // justifyContent: 'center',
    // bottom: 10,
    borderWidth: 1,
    borderColor: 'white',
    height: 200,
  },
});

export { ControlPanel };
