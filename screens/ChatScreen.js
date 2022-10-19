import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { auth, db, chatCollection, currentTime } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import SenderMessage from '../components/SenderMessage';
import { v4 as uuid } from 'uuid';
import ReciverMessage from '../components/ReciverMessage';

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');


  const handleCall = () => {
    const user = route.params.number;
    const call = Linking.openURL(`tel:*67 +1 ${user}`);
    return call;
  };

  useEffect(() => {
    const subscriber = chatCollection
      .doc(`${route.params.name} and ${auth.currentUser.displayName}`)
      .collection(
        `${route.params.name} and ${auth.currentUser.displayName} Messages`
      )
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const allMessages = [];

        querySnapshot.forEach((documentSnapshot) => {
          allMessages.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setMessages(allMessages);
      });

    return () => subscriber();
  }, [chatCollection]);

  console.log(auth.currentUser.displayName);

  const sendMessage = () => {
    chatCollection
      .doc(`${route.params.name} and ${auth.currentUser.displayName}`)
      .collection(
        `${route.params.name} and ${auth.currentUser.displayName} Messages`
      )
      .add({
        message: input,
        userId: auth.currentUser.uid,
        sentTo: route.params.name,
        displayName: auth.currentUser.displayName,
        createdAt: new Date(),
        id: uuid(),
      });
    setInput('');
  };

  const send = () => {
    chatCollection
      .doc(`${auth.currentUser.displayName} and ${route.params.name}`)
      .collection(
        `${auth.currentUser.displayName} and ${route.params.name} Messages`
      )
      .add({
        message: input,
        userId: auth.currentUser.uid,
        sentTo: route.params.name,
        sentFrom: auth.currentUser.displayName,
        createdAt: new Date(),
        id: uuid(),
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
            <Image
              source={{ uri: route.params.image }}
              style={{ height: 45, width: 45, borderRadius: 45 / 2 }}
            />
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
        <View
          style={{
            flex: 1,
            top: 1,
            height: '100%',
            width: '100%',
            marginBottom: 53,
          }}
        >
          <FlatList
          showsVerticalScrollIndicator={false} 

            data={messages}
            inverted={-1}
            style={{ bottom: '2%' }}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === auth.currentUser.uid ? (
                <SenderMessage key={message.id} message={message}  setcolor={'#E04D5C'} text={'Me'}/>
              ) : (
                <ReciverMessage key={message.id} message={message}  setcolor={'#4FAAF9'} text={route.params.name}/>
              )
            }
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'white',
            bottom: 0,
            borderColor: 'gray',
            position: 'absolute',
            width: '100%',
            paddingLeft: 10,
          }}
        >
          <TextInput
            placeholder="Send Message..."
            onChangeText={(text) => setInput(text)}
            value={input}
            style={{ height: 50, width: '85%' }}
            multiline={true}
          />
          <TouchableOpacity title="Send" onPress={sendMessage} onPressIn={send}>
            <Ionicons
              name="send"
              size={25}
              style={{ top: '20%', right: 15, position: 'absolute' }}
              color="#40AFE5"
            />
          </TouchableOpacity>
        </View>
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
