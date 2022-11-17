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
import { AddFriendCollection, auth, usersCollection } from '../firebase';
import CustomTextinput from '../components/CustomTextinput';
import Ionicons from '@expo/vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const Birthday = ({ navigation }) => {
  const [date, setDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showIos, setShowIos] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState(false);

  let today = new Date(
    new Date().getFullYear() - 13,
    new Date().getMonth(),
    new Date().getDate()
  );

  useEffect(() => {
    if (date > today) {
      setError(true);
      setDisable(true);
    } else setDisable(false), setError(false);
  }, [date]);

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
          date.getFullYear(),
      })
      .then(() =>
        AddFriendCollection.doc(auth.currentUser.uid).update({
          Date_Of_Birth:
            date.getMonth() +
            1 +
            '/' +
            date.getDate() +
            '/' +
            date.getFullYear(),
        })
      )
      .then(() => navigation.navigate('Name'));
  };
  const onChange = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };

  const onChangeIos = (event, selectedDate) => {
    setShowIos(false);
    setDate(selectedDate);
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
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 25, top: '15%' }}>
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
                  date.getFullYear()
                }
              />
            </TouchableOpacity>
          ) : null}
          {Platform.OS === 'ios' ? (
            <CustomTextinput
              viewStyle={{ top: '52%' }}
              text={'BIRTHDAY'}
              editable={false}
              textinputStyle={styles.inputIOS}
              value={
                date.getMonth() +
                1 +
                '/' +
                date.getDate() +
                '/' +
                date.getFullYear()
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
                  dateFormat="longdate"
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
        {error === true ? (
          <>
            <View
              style={{
                alignSelf: 'center',
                height: '5%',

                width: '50%',
                flexDirection: 'row',
                position: 'absolute',
                bottom: '18%',
              }}
            >
              <View
                style={{
                  alignSelf: 'center',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20%',
                }}
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={40}
                  color={'rgba(240,210,0,0.50)'}
                />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  borderWidth: 0.5,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                  borderColor: 'orangeyellow',
                  backgroundColor: 'rgba(255,255,0,0.20)',
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>
                  Must Be Over 18 Years Of Age
                </Text>
              </View>
            </View>
          </>
        ) : null}

        <TouchableButton
          text="Continue"
          onPressIn={addBirthday}
          disable={disable}
          style={{ backgroundColor: disable === true ? 'gray' : '#10ACFF' }}
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
    height: '22%',
    width: '80%',
    alignSelf: 'center',
    paddingLeft: '3%',
    fontSize: 15,
  },
  inputIOS: {
    height: '15%',
    width: '80%',
    alignSelf: 'center',
    paddingLeft: '3%',
    fontSize: 15,
  },
  iosPicker: {
    right: '10%',
    width: '50%',
    position: 'absolute',
  },
});

export default Birthday;
