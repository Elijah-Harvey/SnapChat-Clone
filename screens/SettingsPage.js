import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SettingsView from '../components/SettingsView';

const SettingsPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ left: '5%', alignItems: 'flex-start' }}
        >
          <Ionicons
            name="chevron-back"
            size={35}
            color={'mediumseagreen'}
            style={{ opacity: 0.8, fontWeight: '600' }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
            marginLeft: 10,
            color: 'mediumseagreen',
            opacity: 0.8,
            fontWeight: '600',
          }}
        >
          Settings
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#eaeaea',
          width: '100%',
          height: 30,
          justifyContent: 'center',
          paddingLeft: 10,
        }}
      >
        <Text
          style={{
            color: 'mediumseagreen',
            opacity: 0.8,
            fontWeight: '600',
          }}
        >
          Privacy Control
        </Text>
      </View>
      <SettingsView text="Contact Me" />
      <SettingsView text="Use My Bitmoji Avatar" />
      <SettingsView text="View My Story" />
      <SettingsView text="See Me In Quick Add" />
      <SettingsView text="See My Location" />
      <SettingsView text="Memories" />
      <SettingsView text="Lenses" />
      <SettingsView text="Spectacles" />
      <SettingsView text="Play" />
      <SettingsView text="Customize Emojis" />
      <SettingsView text="Ads" />
      <SettingsView text="Data Server" />
      <SettingsView text="Scan" />
      <View
        style={{
          backgroundColor: '#eaeaea',
          width: '100%',
          height: 30,
          justifyContent: 'center',
          paddingLeft: 10,
        }}
      >
        <Text
          style={{
            color: 'mediumseagreen',
            opacity: 0.8,
            fontWeight: '600',
          }}
        >
          Support
        </Text>
      </View>
      <SettingsView text="Contact Us"/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SettingsPage;
