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
  Button,
} from 'react-native';
import TouchableButton from '../components/TouchableButton';

import DateTimePicker from '@react-native-community/datetimepicker';


const { height } = Dimensions.get('window');

const Birthday = ({ navigation }) => {
  const [date, setDate] = useState(new Date('10/06/2022'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showIos, setShowIos] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
 
  const onChangeIos = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowIos(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode('currentMode');
  };

  const showModeIOS = (currentMode) => {
    if (Platform.OS === 'ios') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showDatepickerIOS = () => {
    showModeIOS('date');
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
          <Text style={{ fontSize: 25, position: 'absolute', top: '15%' }}>
            When's your birthday?
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            bottom: '50%',
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
            BIRTHDAY
          </Text>
          {Platform.OS === 'android' ? (
            <TouchableOpacity onPress={showDatepicker}>
              <TextInput
                placeholderTextColor={'black'}
                editable={false}
                style={styles.input}
                value={date.toLocaleString()}
              />
            </TouchableOpacity>
          ) : null}
          {Platform.OS === 'ios' ? (
            <TextInput
              placeholderTextColor={'black'}
              editable={false}
              style={styles.input}
              value={date.toLocaleString()}
              onPressIn={showDatepickerIOS}
            />
          ) : null}
          {Platform.OS === 'android'
            ? show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )
            : null}
          {Platform.OS === 'ios'
            ? show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChangeIos}
                  style={styles.iosPicker}
                />
              )
            : null}
        </View>

        <TouchableButton
          text="Continue"
          onPress={() => navigation.navigate('Username')}
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
  iosPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '65%',
    top: '46%',
    width: 90,
  },
});

export default Birthday;
