import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Friends from './Friends';

const FriendList = (props) => {
  const DUMMY_DATA = [
    {
      id: 1,
      name: 'Father Harvey',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      name: 'Zeke Harvey',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      name: 'Lizzy Harvey',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      name: 'Ethan Harvey',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      name: 'Elijah Harvey',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      name: 'Father Harvey',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 7,
      name: 'Zeke Harvey',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 8,
      name: 'Lizzy Harvey',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 9,
      name: 'Ethan Harvey',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 10,
      name: 'Elijah Harvey',
      image: 'https://picsum.photos/200/300',
    },
  ];
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Friends image={item.image} name={item.name} />
        )}
      />
    </View>
  );
};

export default FriendList;
