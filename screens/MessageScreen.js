import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import Header from '../components/Header';
import MessageRow from '../components/MessageRow';

const DUMMY_DATA = [
  {
    id: 1,
    name: 'Father Harvey',
    streak: '100',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    name: 'Zeke Harvey',
    streak: '51',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    name: 'Lizzy Harvey',
    streak: '5',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    name: 'Ethan Harvey',
    streak: '17',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    name: 'Elijah Harvey',
    streak: '1000',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 6,
    name: 'Father Harvey',
    streak: '100',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 7,
    name: 'Zeke Harvey',
    streak: '51',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 8,
    name: 'Lizzy Harvey',
    streak: '5',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 9,
    name: 'Ethan Harvey',
    streak: '17',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 10,
    name: 'Elijah Harvey',
    streak: '1000',
    image: 'https://picsum.photos/200/300',
  },
];

const MessageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          rightIcon="chatbubbles-outline"
          title="Chat"
          onPress={() => navigation.navigate('Profile')}
        />

        <FlatList
          data={DUMMY_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageRow
              image={item.image}
              name={item.name}
              streak={item.streak}
              onPress={() => navigation.navigate('Chat', { name: item.name, image: item.image })}
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
