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
  Button,
  Alert,
} from 'react-native';
import TouchableButton from '../components/TouchableButton';

import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, usersCollection } from '../firebase';
import CustomTextinput from '../components/CustomTextinput';

const { height } = Dimensions.get('window');

const Birthday = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showIos, setShowIos] = useState(false);
  const [disable, setDisable] = useState(false);

  let today = new Date();

  //((today.getMonth()+1)+'/'+ today.getDate() +'/'+ (today.getFullYear()) > (date.getMonth()+1)+'/'+ date.getDate() +'/'+ (date.getFullYear()-13))
  
useEffect(() => {
  if (date.getFullYear() >= today.getFullYear() - 12 ) {
    Alert.alert('Must be 13 years of age')
    setDisable(true)
  } else setDisable(false)
}, [date])

console.log(auth.currentUser.uid)
  const addBirthday = async () => {
     usersCollection
          .doc(auth.currentUser.uid)
          .update({
            Date_Of_Birth:
              date.getMonth() +
              1 +
              '/' +
              date.getDate() +
              '/' +
              date.getFullYear().toString(),
          })
          .then( () => navigation.navigate('Name'))
  };

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
    if (Platform.OS == 'android') {
      setShow(true);
    }
    setMode(currentMode);
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
            bottom: '50%',
            justifyContent: 'center',
          }}
        >
          {Platform.OS === 'android' ? (
            <TouchableOpacity onPress={showDatepicker}>
              <CustomTextinput
                textstyle={{ marginBottom: 5 }}
                viewStyle={{ top: '44%' }}
                text={'BIRTHDAY'}
                editable={false}
                textinputStyle={styles.input}
                value={
                  date.getMonth() +
                  1 +
                  '/' +
                  date.getDate() +
                  '/' +
                  date.getFullYear().toString()
                }
              />
            </TouchableOpacity>
          ) : null}
          {Platform.OS === 'ios' ? (
            <CustomTextinput
              viewStyle={{ top: '54%' }}
              text={'BIRTHDAY'}
              editable={false}
              textinputStyle={styles.inputIOS}
              value={
                date.getMonth() +
                1 +
                '/' +
                date.getDate() +
                '/' +
                date.getFullYear().toString()
              }
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
                  display="spinner"
                  maximumDate={new Date()}
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
                  maximumDate={new Date()}
                />
              )
            : null}
        </View>

        <TouchableButton text="Continue" onPressIn={addBirthday} disable={disable} style={{backgroundColor: disable === true ? 'gray' : '#10ACFF'}}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: '22%',
    width: '80%',
    alignSelf: 'center',
    paddingLeft: '3%',
  },
  inputIOS: {
    height: '15%',
    width: '80%',
    alignSelf: 'center',
    paddingLeft: '3%',
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
