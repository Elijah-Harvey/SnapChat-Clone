import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { auth, usersCollection } from '../firebase';
import Friends from './Friends';

const FriendList = ({navigation, nav}) => {
 const [data, setData] = useState([])

useEffect(() => {
    const subscriber = usersCollection.where('UID', '==', auth.currentUser.uid)
    .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setData(users);
      });

    return () => subscriber();
  }, [setData]);

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Friends image={item.Profile_Picture} name={item.name} nav={nav} onPress={() =>
            nav.navigate('RouteProfile', {
              name: item.name,
              image: item.Profile_Picture,
              number: item.Number,
              uid: item.UID,
              email: item.Email,
            })}/>
        )}
      />
    </View>
  );
};

export default FriendList;
