import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const SettingsView = ({ text, style }) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          {
            width: '100%',
            height: 47,
            paddingLeft: 10,
            justifyContent: 'center',
            borderBottomColor: '#ededed',
            borderBottomWidth: 1,
          },
          style,
        ]}
      >
        <Text style={{ fontWeight: '500', fontSize: 17 }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsView;
