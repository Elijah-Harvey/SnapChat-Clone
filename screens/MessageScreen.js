import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import Header from '../components/Header';
import MessageRow from '../components/MessageRow';
import {
  auth,
  FriendCollection,
  messageCollection,
  usersCollection,
} from '../firebase';
import { v4 as uuid } from 'uuid';
import RandomStreak from '../components/RandomStreak';

const MessageScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const roomId = uuid.v4();

  useEffect(() => {
    const subscriber = FriendCollection.doc(auth.currentUser.uid)
      .collection('Friends')
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          top={'10%'}
          rightIcon="chatbubbles-outline"
          title="Chat"
          onPress={() => navigation.navigate('Profile')}
        />
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <MessageRow
              name={item.name}
              image={'https://picsum.photos/200/300'}
              streak={RandomStreak()}
              onPress={() => {
                navigation.navigate('Chat', {
                  name: item.name,
                  image: 'https://picsum.photos/200/300',
                  number: item.Number,
                  uid: item.UID,
                  roomId: roomId,
                  email: item.Email,
                  long: item.location.longitude,
                  lat: item.location.latitude,
                  region: item.address.city,
                });
              }}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default MessageScreen;
