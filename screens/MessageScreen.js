import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import Header from '../components/Header';
import MessageRow from '../components/MessageRow';
import { auth, db, messageCollection, usersCollection } from '../firebase';
import { v4 as uuid } from 'uuid';

const MessageScreen = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const subscriber = usersCollection
      .where('UID', '!=', auth.currentUser.uid)
      .orderBy('UID', 'desc')
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

  const UpdateStreak = (string) => {
    const num = parseInt(string);
    const newText = num.toLocaleString();

    return newText;
  };

  const roomId = uuid.v4();

  const addRommId = () => {
    messageCollection.doc(auth.currentUser.uid).set({
      roomId: roomId,
      userId: auth.currentUser.uid,
    });
  };

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
              streak={UpdateStreak(Math.floor(Math.random() * 1000000) + 10000)}
              onPress={() => {
                navigation.navigate('Chat', {
                  name: item.name,
                  image: 'https://picsum.photos/200/300',
                  number: item.Number,
                  uid: item.UID,
                  roomId: roomId
                });
              }}
              onPressIn={addRommId}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MessageScreen;
