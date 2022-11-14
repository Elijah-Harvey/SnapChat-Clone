import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import FriendsRow from '../components/FriendsRow';
import SubRow from '../components/SubRow';
import ForYouRow from '../components/ForYouRow';
import { auth, usersCollection } from '../firebase';

function HomeScreen({ navigation, route }) {
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

  console.log(user);

  return (
    <SafeAreaView>
      <Header
        title="Stories"
        rightIcon="ellipsis-horizontal-outline"
        onPress={() => navigation.navigate('Profile')}
      />
      <FlatList
        data={user}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.pic }}
            style={{ height: 100, width: 100 }}
          />
        )}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <FriendsRow nav={navigation} />
        <SubRow />
        <ForYouRow /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Scroll: {
    flexDirection: 'column',
    flex: 1,
  },
});

export default HomeScreen;
