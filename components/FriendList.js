import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { auth, FriendCollection, usersCollection } from '../firebase';
import Friends from './Friends';
import { v4 as uuid } from 'uuid';

const FriendList = ({ navigation, nav }) => {
  const [data, setData] = useState([]);
  const roomId = uuid();

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
          <Friends
            key={item.id}
            image={item.Profile_Picture}
            name={item.name}
            nav={nav}
            onPress={() =>
              nav.navigate('RouteProfile', {
                name: item.name,
                image: 'https://picsum.photos/200/300',
                number: item.Number,
                uid: item.UID,
                roomId: roomId,
                email: item.Email,
                long: item.location.longitude,
                lat: item.location.latitude,
                region: item.address.city,
              })
            }
          />
        )}
      />
    </View>
  );
};

export default FriendList;
