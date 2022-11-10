import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { auth, messageCollection } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import SenderMessage from '../components/SenderMessage';
import { v4 as uuid } from 'uuid';
import CustomDate from '../components/CustomDate';
import MapView, { Marker } from 'react-native-maps';
import CustomMapView from '../components/CustomMapView';

const ChatScreen = ({ navigation, route, map }) => {
  const [input, setInput] = useState('');
  const [disable, setDisable] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageId = uuid();

  useEffect(() => {
    messageCollection.doc(auth.currentUser.uid).update({
      room: [route.params.roomId, auth.currentUser.uid, route.params.uid],
    });
  });

  useEffect(() => {
    const subscriber = messageCollection
      .doc(auth.currentUser.uid)
      .collection('Messages')
      // .where('room', 'array-contains', auth.currentUser.uid)
      .where('room', 'array-contains', route.params.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const allSentMessages = [];

        querySnapshot.forEach((documentSnapshot) => {
          allSentMessages.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setMessages(allSentMessages);
      });
    return () => subscriber();
  }, [messageCollection]);

  useEffect(() => {
    if (input.trim()) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [input]);

  const handleCall = () => {
    const user = route.params.number;
    const call = Linking.openURL(`tel:*67 +1 ${user}`);
    return call;
  };

  const sendMessage = () => {
    messageCollection
      .doc(auth.currentUser.uid)
      .collection('Messages')
      .add({
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        createdAt: new Date(),
        id: messageId,
        time: CustomDate(),
        map: false,
        userId: route.params.uid,
        roomId: route.params.roomId,
        room: [route.params.roomId, auth.currentUser.uid, route.params.uid],
      })
      .then(() => {
        messageCollection.doc(route.params.uid).collection('Messages').add({
          message: input,
          createdAt: new Date(),
          id: messageId,
          time: CustomDate(),
          map: false,
          roomId: route.params.roomId,
          userId: route.params.uid,
          room: [route.params.roomId, auth.currentUser.uid, route.params.uid],
        });
        setInput('');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            borderTopColor: 'transparent',
            borderColor: 'lightgray',
            height: '10%',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <View style={styles.circle}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RouteProfile', {
                  name: route.params.name,
                  image: 'https://picsum.photos/200/300',
                  number: route.params.Number,
                  uid: route.params.uid,
                  roomId: route.params.roomId,
                  email: route.params.email,
                  long: route.params.long,
                  lat: route.params.lat,
                  region: route.params.region,
                })
              }
            >
              <Image
                source={{ uri: 'https://picsum.photos/200/300' }}
                style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 20 }}>{route.params.name}</Text>
          <TouchableOpacity
            onPress={handleCall}
            style={{
              right: '30.5%',
              backgroundColor: 'lightgray',
              width: 50,
              height: 35,
              position: 'absolute',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="call" size={25} />
          </TouchableOpacity>
          <View
            style={{
              right: '18%',
              backgroundColor: 'lightgray',
              width: 50,
              height: 35,
              position: 'absolute',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="videocam" size={25} />
          </View>
          <TouchableOpacity
            style={{ right: '5%', position: 'absolute' }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-forward" size={40} />
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={messages}
          inverted={-1}
          style={{ top: '0.5%', bottom: '10%', height: '75%' }}
          keyExtractor={(item) => item.id}
          renderItem={({ item: message }) =>
            message.map === false ? (
              <SenderMessage
                key={message.id}
                message={message.message}
                borderLeftColor={
                  message.email === auth.currentUser.email
                    ? '#E04D5C'
                    : '#4FAAF9'
                }
                color={
                  message.email === auth.currentUser.email
                    ? '#E04D5C'
                    : '#4FAAF9'
                }
                text={
                  message.email === auth.currentUser.email
                    ? 'ME'
                    : route.params.name
                }
                time={message.time}
              />
            ) : (
              <CustomMapView
                key={message.id}
                lat={message.lat}
                long={message.long}
                region={message.region}
                borderLeftColor={
                  message.user === auth.currentUser.uid
                    ? '#E04D5C'
                    : '#4FAAF9'
                }
                color={
                  message.user === auth.currentUser.uid
                    ? '#E04D5C'
                    : '#4FAAF9'
                }
                user={
                  message.user === auth.currentUser.uid
                    ? 'ME'
                    : route.params.name
                }
              />
            )
          }
        />

        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: 'column-reverse' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderColor: 'gray',
              width: '100%',
              paddingLeft: 10,
              height: 54,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingRight: 10,
            }}
          >
            <TextInput
              placeholder="Send Message..."
              onChangeText={(text) => setInput(text)}
              value={input}
              onSubmitEditing={disable === true ? null : sendMessage}
              keyboardAppearance="dark"
            />
            <TouchableOpacity
              title="Send"
              onPress={disable === true ? null : sendMessage}
              disabled={disable}
            >
              <Ionicons
                name="send"
                size={25}
                style={{}}
                color={disable === true ? 'gray' : '#40AFE5'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    borderWidth: 1,
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
