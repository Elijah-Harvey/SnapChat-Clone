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
  const [user, setUser] = useState({})

  useEffect(() => {
    const subscriber = usersCollection
      .doc(auth.currentUser.uid)
      .get()
      .then(function (doc) {
        doc.exists ? setUser(doc.data()) : `doc doesnt exist`;
      });

    return () => subscriber;
  }, [usersCollection]);

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
            fontSize: 20,
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
                !item.name
                  ? item.name.length > 12
                  : item.Email.length > 12
                  ? item.name
                    ? item.name.substring(0, 12 - 3) + '...'
                    : item.Email.substring(0, 12 - 3) + '...'
                  : item.name
                  ? item.name
                  : item.Email
              }
              nickName={'test'}
              text={'Accept'}
              styleTouch={{ width: '35%', right: '12%' }}
              styleText={{ right: '15%' }}
              onPressIn={() =>
                FriendCollection.doc(item.sentFrom)
                  .collection('Friends')
                  .add({
                    Date_Joined: user.Date_Joined,
                    Date_Of_Birth: user.Date_Of_Birth,
                    Email: user.Email,
                    Last_Known_Password: user.Last_Known_Password,
                    Number: user.Number,
                    Profile_Picture: user.Profile_Picture,
                    UID: user.UID,
                    address: user.address,
                    key: user.key,
                    location: user.location,
                    name: user.name,
                    streak: user.streak,
                    sentFrom: item.sentFrom,
                    sentTo: item.sentTo,
                    key: item.key,
                  })
                  .then(() =>
                    FriendCollection.doc(auth.currentUser.uid)
                      .collection('Friends')
                      .add({
                        Date_Joined: item.Date_Joined,
                        Date_Of_Birth: item.Date_Of_Birth,
                        Email: item.Email,
                        Last_Known_Password: item.Last_Known_Password,
                        Number: item.Number,
                        Profile_Picture: item.Profile_Picture,
                        UID: item.UID,
                        address: item.address,
                        key: item.key,
                        location: item.location,
                        name: item.name,
                        streak: item.streak,
                        sentFrom: item.sentFrom,
                        sentTo: item.sentTo,
                        key: item.key,
                      })
                  )
              }
              onPressOut={() =>
                PendingCollection.doc(item.UID)
                  .collection('Pending')
                  .where('sentTo', '==', auth.currentUser.uid)
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      doc.ref.delete()
                    });
                  })
                  .then(() => AddFriendCollection.doc(item.UID).update({isBlocked: true}))
              }
              onPress={() =>
                PendingCollection.doc(item.UID)
                  .collection('Pending')
                  .where('sentFrom', '==', auth.currentUser.uid)
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      doc.ref.delete();
                    });
                  })
                  .then(() =>
                    AddFriendCollection.doc(auth.currentUser.uid).update({isBlocked: true})
                  )
              }
              onTap={() =>
                AddFriendCollection.doc(item.UID)
                  .update({
                    isBlocked: false,
                  })
                  .then(() =>
                    PendingCollection.doc(auth.currentUser.uid)
                      .collection('Pending')
                      .where('sentFrom', '==', item.UID)
                      .get()
                      .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                          doc.ref.delete(), console.log('deleted');
                        });
                      })
                      .then(() =>
                        AddFriendCollection.doc(auth.currentUser.uid).update({
                          isBlocked: false,
                        })
                      )
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
