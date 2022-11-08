import React from 'react';
import { StyleSheet, View, Text, TextInput, Platform } from 'react-native';

const CustomTextinput = ({
  text,
  textinputStyle,
  value,
  onChangeText,
  viewStyle,
  keyBoardType,
  secureTextEntry,
  maxLength,
  onSubmitEditing,
  onPressIn,
  editable,
  textstyle
}) => {
  return (
    <>
      <View
        style={[
          {
            borderWidth: 1,
            width: '80%',
            alignSelf: 'center',
            height: '3%',
            borderTopColor: 'transparent',
            position: 'absolute',
          },
          viewStyle,
        ]}
      />
      <Text
        style={[{
          fontSize: 15,
          left: '10%',
          color: '#6CA6DC',
        }, textstyle]}
      >
        {text}
      </Text>
      <TextInput
        placeholderTextColor={'black'}
        autoCapitalize={'none'}
        style={textinputStyle}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyBoardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        onPressIn={onPressIn}
        editable={editable}
      />
    </>
  );
};


export default CustomTextinput;
