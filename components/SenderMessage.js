import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Modal,
  Pressable,
  StyleSheet,
  Touchable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Expo from 'expo-sms';
import { BlurView } from 'expo-blur';
import * as Clipboard from 'expo-clipboard';
import * as Contacts from 'expo-contacts';


const SenderMessage = ({
  message,
  text,
  time,
  borderLeftColor,
  color,
  Msg,
  MsgNumber,
  onDelete,
  onPress,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
          setContacts(contact)
        }
      }
    })();
  }, []);



  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(Msg);
  };

  const onShare = async () => {
    if (modalVisible) {
      const result = await Share.share({
        message: Msg,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          alert('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        setModalVisible(false);
      }
    }
  };

  const sendMsg = async () => {
    const isAvailable = await Expo.isAvailableAsync();
    if (isAvailable) {
      const { result } = await Expo.sendSMSAsync(MsgNumber, Msg);
      return result;
    } else console.log('didnt work');
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View
            style={{
              borderRadius: 50,
              overflow: 'hidden',
              borderWidth: 1,
              justifyContent: 'space-evenly',
              height: '30%',
              width: '80%',
            }}
          >
            <BlurView intensity={10} style={styles.modalView}>
              <TouchableOpacity style={styles.touch} onPress={onShare}>
                <Text style={styles.textStyle}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={sendMsg}>
                <Text style={styles.textStyle}>Forward</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touch}
                onPress={copyToClipboard}
                onPressOut={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touch}
                onPress={onDelete}
                onPressOut={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.touch}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </View>
      </Modal>
      <View
        style={{
          left: 10,
          marginTop: '5%',
          width: '70%',
        }}
      >
        <Text style={{ fontWeight: '600', fontSize: 17, color, bottom: '4%' }}>
          {text}
        </Text>
        <TouchableOpacity
          onPressIn={onPress}
          onPressOut={() => setModalVisible(true)}
          
        >
          <View
            style={{
              borderLeftWidth: 3,
              marginBottom: '1.5%',
              padding: '2.5%',
              borderLeftColor: borderLeftColor,
              backgroundColor: '#ededed',
              width: '100%',
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                flex: 1,
                flexWrap: 'wrap',
              }}
            >
              {message}
            </Text>
            <Text style={{ fontSize: 8, color: 'black', fontWeight: '500' }}>
              {time}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
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
    overflow: 'hidden',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  modalView: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  touch: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    width: '50%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SenderMessage;
