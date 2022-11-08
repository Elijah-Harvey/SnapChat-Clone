import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import MessageRow from '../components/MessageRow';
import {
  auth,
  FriendCollection,
  usersCollection,
  PendingCollection,
  AddFriendCollection,
} from '../firebase';
import AddFriendsRow from '../components/AddFriendsRow';

const AddedMe = (props) => {
  const [data, setData] = useState([]);
  const [test, setTest] = useState(false);

  useEffect(() => {
    const subscriber = PendingCollection.doc(auth.currentUser.uid)
      .collection('Pending')
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const users = [];

          querySnapshot.forEach((documentSnapshot) => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setData(users);
          setTest(true);
        }
        if (querySnapshot.empty) {
          setTest(false);
        }
      });

    return () => subscriber();
  }, [setData]);

  return test === true ? (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        top: 30,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: '100%',
        }}
      >
        <Text
          style={{
            fontWeight: '700',
            fontSize: '20%',
          }}
        >
          Added Me
        </Text>
      </View>

      <View style={{}}>
        <FlatList
          data={data}
          numColumns={1}
          renderItem={({ item }) => (
            <AddFriendsRow
              name={
                item.item.name
                  ? item.item.name.length > 12
                  : item.item.Email.length > 12
                  ? item.item.name
                    ? item.item.name.substring(0, 12 - 3) + '...'
                    : item.item.Email.substring(0, 12 - 3) + '...'
                  : item.item.name
                  ? item.item.name
                  : item.item.Email
              }
              nickName={'test'}
              text={'Accept'}
              styleTouch={{ width: '35%', right: '12%' }}
              styleText={{ right: '15%' }}
              onPressIn={() =>
                FriendCollection.doc(item.item.UID)
                  .collection('Friends')
                  .add({
                    item: item,
                  })
                  
              }
              onPressOut={() =>
                PendingCollection.doc(item.item.UID)
                  .collection('Pending')
                  .where('sentTo', '==', auth.currentUser.uid)
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      doc.ref.delete();
                    });
                  })
                  .then(() => AddFriendCollection.doc(item.item.UID).delete())
              }
              onPress={() =>
                PendingCollection.doc(auth.currentUser.uid)
                  .collection('Pending')
                  .where('sentTo', '==', item.item.UID)
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      doc.ref.delete();
                    });
                  })
                  .then(() =>
                    AddFriendCollection.doc(auth.currentUser.uid).delete()
                  )
              }
              onTap={() =>
                AddFriendCollection.doc(item.item.UID)
                  .update({
                    isBlocked: false,
                  })
                  .then(() =>
                    PendingCollection.doc(item.item.UID)
                      .collection('Pending')
                      .where('sentTo', '==', auth.currentUser.uid)
                      .get()
                      .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                          doc.ref.delete(), console.log('deleted');
                        });
                      })
                  )
              }
            />
          )}
        />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {},
});

export default AddedMe;
