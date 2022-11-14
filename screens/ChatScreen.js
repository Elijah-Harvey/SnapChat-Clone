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
  Share,
  Modal,
  Pressable,
} from 'react-native';
import { auth, messageCollection } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import SenderMessage from '../components/SenderMessage';
import { v4 as uuid } from 'uuid';
import CustomDate from '../components/CustomDate';
import CustomMapView from '../components/CustomMapView';
import * as MailComposer from 'expo-mail-composer';
import { Alert } from 'react-native';

const ChatScreen = ({ navigation, route, map }) => {
  const [input, setInput] = useState('');
  const [disable, setDisable] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageId = uuid();
  const [mId, setMId] = useState({});
  const [bodySMS, setBodySMS] = useState();
  const [status, setStatus] = useState();



  //   const sendEmail = async(file) => {
  //     var options = {}
  //     if(file.length < 1){
  //       options = {
  //         subject: "",
  //         recipients: ["zekeharvey16@gmail.com"],
  //         body: "56 saint crox st.augstine florida"
  //       }
  //     }else{
  //       options = {
  //       subject: "",
  //       recipients: ["lizzy220188@gmail.com"],
  //       body: "56 saint crox st.augstine florida",
  //     }
  //     let promise = new Promise((resolve, reject) => {
  //       MailComposer.composeAsync(options)
  //         .then((result) => {
  //           resolve(result)
  //         })
  //         .catch((error) => {
  //           reject(error)
  //         })
  //       })
  //     promise.then(
  //       result => setStatus("Status: email " + result.status),
  //       error => setStatus("Status: email " + error.status)
  //      )
  //   }
  // }

  useEffect(() => {
    messageCollection.doc(auth.currentUser.uid).set({
      room: [route.params.roomId, auth.currentUser.email, route.params.email],
    });
  }, []);

  useEffect(() => {
    messageCollection.doc(route.params.uid).set({
      room: [route.params.roomId, auth.currentUser.email, route.params.email],
    });
  }, [messageCollection]);

  useEffect(() => {
    const subscriber = messageCollection
      .doc(auth.currentUser.uid)
      .collection('Messages')
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
        messageCollection
          .doc(route.params.uid)
          .collection('Messages')
          .add({
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

  const ListFooter = () => {
    return <View style={styles.headerFooterStyle} />;
  };

  const onDelete = () => {
    messageCollection
      .doc(auth.currentUser.uid)
      .collection('Messages')
      .where('id', '==', mId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete(), console.log('deleted');
        });
      })
      .then(() =>
        messageCollection
          .doc(route.params.uid)
          .collection('Messages')
          .where('id', '==', mId)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              doc.ref.delete(), console.log('deleted');
            });
          })
      );
  };

  console.log(mId)

  return (
    <SafeAreaView style={styles.container}>
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
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
        data={messages}
        inverted={-1}
        style={{ height: '80%', marginBottom: '15%', top: '1%' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item: message }) =>
          message.map === false ? (
            <SenderMessage
              key={message.id}
              message={message.message}
              borderLeftColor={
                message.email === auth.currentUser.email ? '#E04D5C' : '#4FAAF9'
              }
              color={
                message.email === auth.currentUser.email ? '#E04D5C' : '#4FAAF9'
              }
              text={
                message.email === auth.currentUser.email
                  ? 'ME'
                  : route.params.name
              }
              time={message.time}
              test={message.message}
              Msg={message.message}
              MsgNumber={route.params.number}
              onPress={() => setMId(message.id)}
              onDelete={() =>
                Alert.alert(
                  'Alert Title',
                  'alertMessage',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('didnt work'),
                    },
                    { text: 'OK', onPress: onDelete},
                  ],
                  { cancelable: false }
                )
              }
            />
          ) : (
            <CustomMapView
              key={message.id}
              lat={message.lat}
              long={message.long}
              region={message.region}
              borderLeftColor={
                message.user === auth.currentUser.uid ? '#E04D5C' : '#4FAAF9'
              }
              color={
                message.user === auth.currentUser.uid ? '#E04D5C' : '#4FAAF9'
              }
              user={
                message.user === auth.currentUser.uid ? 'ME' : route.params.name
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
            borderColor: 'black',
            width: '100%',
            height: 54,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingRight: 5,
            paddingLeft: 5,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 50 / 2,
              backgroundColor: 'lightgray',
              height: 43,
              width: 43,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="camera" size={30} style={{}} color={'black'} />
          </TouchableOpacity>

          <TextInput
            placeholder="Send Message..."
            onChangeText={(text) => setInput(text)}
            value={input}
            onSubmitEditing={disable === true ? null : sendMessage}
            keyboardAppearance="dark"
            style={{
              width: '50%',
              height: '80%',
              borderRadius: 30,
              backgroundColor: 'lightgray',
              paddingLeft: '3%',
            }}
            returnKeyType="send"
          />

          <TouchableOpacity
            style={{
              borderRadius: 50 / 2,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="happy-outline" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 50 / 2,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="image-outline" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 50 / 2,
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="rocket-outline" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerFooterStyle: {
    height: 65,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ChatScreen;
