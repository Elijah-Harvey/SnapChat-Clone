import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from '../components/Header';
import MessageList from '../components/MessageList';

const MessageScreen = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header rightIcon="chatbubbles-outline" title="Chat" />
        <MessageList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MessageScreen;
