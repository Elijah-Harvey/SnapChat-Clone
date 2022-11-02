import React from 'react';
import Constants from 'expo-constants';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import FriendsRow from '../components/FriendsRow';
import SubRow from '../components/SubRow';
import ForYouRow from '../components/ForYouRow';

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Header 
        title="Stories"
        rightIcon="ellipsis-horizontal-outline"
        onPress={() => navigation.navigate('Profile')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FriendsRow />
        <SubRow />
        <ForYouRow />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Scroll: {
    flexDirection: 'column',
    flex: 1,
  },
});

export default HomeScreen;
