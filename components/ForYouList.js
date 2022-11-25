import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import ForYou from './ForYou';

const ForYouList =  (props) => {
 
  
  const DUMMY_DATA = [
    {
      id: 1,
      title: 'Tanks',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      title: 'Wrestling',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      title: 'War',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      title: 'Long text about war',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      title: 'HEllo',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      title: 'WeIrD LoOkInG tExT',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 7,
      title: 'plus',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 8,
      title: 'a little',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 9,
      title: 'More',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 10,
      title: 'How does this look',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
  ];

  const ListFooter = () => {
    return <View style={styles.headerFooterStyle}></View>;
  };

  return (
    <View>
      <FlatList
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ForYou image={item.image} title={item.title} time={item.time} key={item.id}/>
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

export default ForYouList;
