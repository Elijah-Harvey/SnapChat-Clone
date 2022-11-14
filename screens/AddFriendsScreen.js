import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import MessageRow from '../components/MessageRow';
import {
  auth,
  FriendCollection,
  usersCollection,
  PendingCollection,
} from '../firebase';
import { v4 as uuid } from 'uuid';
import RandomStreak from '../components/RandomStreak';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddFriendsRow from '../components/AddFriendsRow';
import AddFriendList from '../components/AddFriendList';
import AddedMe from '../components/AddedMe';

const AddFriendsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flexDirection: 'column', flex: 1 }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingLeft: '5%',
            paddingRight: '5%',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity>
            <Ionicons name="chevron-down-outline" size={35} />
          </TouchableOpacity>

          <Text
            style={{ alignSelf: 'center', fontWeight: '600', fontSize: 20}}
          >
            Add Friends
          </Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical-outline" size={35} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            height: 50,
            top: 10,
            borderRadius: 20,
            backgroundColor: '#E8E8E8',
            justifyContent: 'center',
            flexDirection: 'row',
            borderWidth: 1,
          }}
        >
          <Ionicons
            name="search-outline"
            size={27}
            style={{
              left: '1%',
              position: 'absolute',
              alignSelf: 'center',
              fontWeight: 'bold',
              left: '4%',
            }}
          />
          <TextInput
            placeholder="Add Friends"
            style={{
              width: '73%',
              alignSelf: 'center',
              height: '100%',
            }}
          />
          <Ionicons
            name="stop-outline"
            size={27}
            style={{
              right: '4%',
              position: 'absolute',
              alignSelf: 'center',
              fontWeight: 'bold',
            }}
          />
        </View>

        <AddedMe />
        <AddFriendList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
});

export default AddFriendsScreen;
