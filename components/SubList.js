import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Subscriptions from './Subscriptions';

const FriendList = (props) => {
  const DUMMY_DATA = [
    {
      id: 1,
      subTitle: 'Tanks',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      subTitle: 'Wrestling',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      subTitle: 'War',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      subTitle: 'Long text about war',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      subTitle: 'HEllo',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      subTitle: 'WeIrD LoOkInG tExT',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 7,
      subTitle: 'plus',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 8,
      subTitle: 'a little',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 9,
      subTitle: 'More',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 10,
      subTitle: 'How does this look',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
  ];
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Subscriptions
            image={item.image}
            subTitle={item.subTitle}
            time={item.time}
          />
        )}
      />
    </View>
  );
};

export default FriendList;
