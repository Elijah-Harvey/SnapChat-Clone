import React, {
  useState,
  useEffect,
  useRef
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
  ScrollView,
} from 'react-native';
import { auth, messageCollection } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import SenderMessage from '../components/SenderMessage';
import { v4 as uuid } from 'uuid';
import ReciverMessage from '../components/ReciverMessage';

const ChatScreen = ({ navigation, route }) => {
  const [receiving, setReceiving] = useState([]);
  const [input, setInput] = useState('');
  const [disable, setDisable] = useState(false);
  const [sending, setSending] = useState([]);
  const scrollViewRef = useRef()

  const autoScroll = () => {
    let offset = 0;
    setInterval(()=> {
        offset += 20
        scrollViewRef.current?.scrollTo({x: 0, y: offset, animated: true})
    }, 1000)
}


  const handleCall = () => {
    const user = route.params.number;
    const call = Linking.openURL(`tel:*67 +1 ${user}`);
    return call;
  };

  useEffect(() => {
    const subscriber = messageCollection
      .where(
        'users.userId',
        '==',
        !route.params.uid ? auth.currentUser.uid : route.params.uid
      )
      .where(
        'users.userId2',
        '==',
        !auth.currentUser.uid ? route.params.uid : auth.currentUser.uid
      )
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const allReceivedMessages = [];

        querySnapshot.forEach((documentSnapshot) => {
          allReceivedMessages.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setSending(allReceivedMessages);
      });

    return () => subscriber();
  }, [messageCollection]);

  useEffect(() => {
    const subscriber = messageCollection
      .where(
        'users.userId',
        '==',
        !auth.currentUser.uid ? route.params.uid : auth.currentUser.uid
      )
      .where(
        'users.userId2',
        '==',
        !route.params.uid ? auth.currentUser.uid : route.params.uid
      )
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const allSentMessages = [];

        querySnapshot.forEach((documentSnapshot) => {
          allSentMessages.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setReceiving(allSentMessages);
      });

    return () => subscriber();
  }, [messageCollection]);

  useEffect(() => {
    if (input === '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [input]);

  let date = new Date();

  let TimeType;
  let hour;

  hour = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (hour <= 12) {
    TimeType = 'AM';
  } else {
    TimeType = 'PM';
  }

  if (hour > 12) {
    hour = hour - 12;
  }

  if (hour == 0) {
    hour = 12;
  }

  function makeTwoDigits(time) {
    const timeString = `${time}`;
    if (timeString.length === 2) return time;
    return `0${time}`;
  }

  const sendMessage = () => {
    messageCollection.add({
      message: input,
      users: {
        userId: route.params.uid,
        userId2: auth.currentUser.uid,
      },
      email: auth.currentUser.email,
      id: uuid(),
      createdAt: new Date(),
      time: makeTwoDigits(hour) + ':' + makeTwoDigits(minutes) + ` ${TimeType}`,
    });
    setInput('');
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
            marginBottom: 53,
          }}
        >
          <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={receiving}
              inverted={-1}
              style={{ top: '0.5%' }}
              keyExtractor={(item) => item.id}
              renderItem={({ item: message }) => (
                <ReciverMessage
                  key={message.id}
                  message={message}
                  setcolor={'#4FAAF9'}
                  text={route.params.name}
                  time={message.time}
                />
              )}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={sending}
              inverted={-1}
              style={{ bottom: '0.5%' }}
              keyExtractor={(item) => item.id}
              renderItem={({ item: message }) => (
                <SenderMessage
                  key={message.id}
                  message={message}
                  setcolor={'#E04D5C'}
                  text={'Me'}
                  time={message.time}
                />
              )}
            />
          </ScrollView>
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
          <TouchableOpacity
            title="Send"
            onPress={sendMessage}
            disabled={disable}
            onPressOut={autoScroll}
          >
            <Ionicons
              name="send"
              size={25}
              style={{ top: '20%', right: 15, position: 'absolute' }}
              color={disable === true ? 'gray' : '#40AFE5'}
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
