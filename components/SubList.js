import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { auth, usersCollection } from '../firebase';
import Subscriptions from './Subscriptions';

const FriendList = (props) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const subscriber = usersCollection
      .doc(auth.currentUser.uid).collection('Pics')
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUser(users);
      });

    return () => subscriber;
  }, [usersCollection]);

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={user}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Subscriptions
            image={item.pic}
            // subTitle={item.subTitle}
            // time={item.time}
            key={item.id}
          />
        )}
      />
    </View>
  );
};

export default FriendList;
