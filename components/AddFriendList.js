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
  Alert,
} from 'react-native';
import Header from '../components/Header';
import MessageRow from '../components/MessageRow';
import {
  auth,
  FriendCollection,
  usersCollection,
  PendingCollection,
  AddFriendCollection,
} from '../firebase';
import { v4 as uuid } from 'uuid';
import RandomStreak from '../components/RandomStreak';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddFriendsRow from '../components/AddFriendsRow';

const AddFriendList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const subscriber = AddFriendCollection.where(
      'UID',
      '!=',
      auth.currentUser.uid
    ).where('isBlocked', '==', false)
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
      });

    return () => subscriber();
  }, [setUsers]);

  const ListFooter = () => {
    return <View style={styles.headerFooterStyle}></View>;
  };

  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        top: 30,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text
          style={{
            fontWeight: '700',
            fontSize: '20%',
          }}
        >
          Quick Add
        </Text>
        <Text
          style={{
            right: '5%',
            fontSize: '15%',
            color: 'gray',
          }}
        >
          All Contacts >
        </Text>
      </View>

      <View style={{}}>
        <FlatList
          ListFooterComponent={ListFooter}
          data={users}
          numColumns={1}
          renderItem={({ item }) => (
            <AddFriendsRow
              name={
                item.name === null
                  ? item.name.length > 12
                  : item.Email.length > 12
                  ? item.name
                    ? item.name.substring(0, 12 - 3) + '...'
                    : item.Email.substring(0, 12 - 3) + '...'
                  : item.name
                  ? item.name
                  : item.Email
              }
              nickName={'test'}
              text={'Add'}
              onPress={() =>
                PendingCollection.doc(item.UID).collection('Pending').add({
                  item: item,
                  sentFrom: auth.currentUser.uid,
                  sentTo: item.UID,
                }).then(() => AddFriendCollection.doc(item.UID).update({
                  isBlocked: true
                }))
              }
              onTap={() => AddFriendCollection.doc(item.UID).update({
                isBlocked: true
              })}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerFooterStyle: {
    width: '100%',
    height: 30,
  },
});

export default AddFriendList;
