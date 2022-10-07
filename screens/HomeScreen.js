import React from 'react';
import Constants from 'expo-constants';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import FriendsRow from '../components/FriendsRow';
import FriendList from '../components/FriendList';
import Subscriptions from '../components/Subscriptions';
import SubRow from '../components/SubRow';
import ForYou from '../components/ForYou';
import ForYouRow from '../components/ForYouRow';

function HomeScreen(props) {
  return (
    <SafeAreaView>
      <Header title="Stories" rightIcon="ellipsis-horizontal-outline" />
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
