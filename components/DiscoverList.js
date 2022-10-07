import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Discover from './Discover';
import ForYou from './ForYou';

const DiscoverList = (props) => {
  const DUMMY_DATA = [
    {
      id: 1,
      title: 'what if we had a really long title',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      title: 'See Photos of the royal baby from every adorable angles',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      title: 'War',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      title: 'Long text about war',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      title: 'HEllo',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      title: 'WeIrD LoOkInG tExT',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 7,
      title: 'plus',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 8,
      title: 'a little',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 9,
      title: 'More',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 10,
      title: 'How does this look',
      image: 'https://picsum.photos/200/300',
    },
  ];

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal={true}
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Discover image={item.image} title={item.title} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerFooterStyle: {
    width: '100%',
    height: 110,
  },
});

export default DiscoverList;
