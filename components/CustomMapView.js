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
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Expo from 'expo-sms';
import { BlurView } from 'expo-blur';
import * as Clipboard from 'expo-clipboard';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomMapView = ({ region, lat, long, borderLeftColor, user, color }) => {
  const [modalVisible, setModalVisible] = useState(false);
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
              <TouchableOpacity style={styles.touch}>
                <Text style={styles.textStyle}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch}>
                <Text style={styles.textStyle}>Forward</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touch}
                onPressOut={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touch}
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
      <View style={{ left: 10, marginTop: '5%' }}>
        <View style={{ bottom: '4%' }}>
          <Text style={{ fontWeight: '600', fontSize: 17, color }}>{user}</Text>
        </View>
        <TouchableOpacity
          onLongPress={() => setModalVisible(true)}
          style={{
            borderLeftWidth: 3,
            marginBottom: '1.5%',
            padding: '2.5%',
            borderLeftColor: borderLeftColor,
            width: '70%',
            overflow: 'hidden',
            justifyContent: 'center',
            height: 170,
            backgroundColor: '#ededed',
          }}
        >
          <View
            style={{
              height: '80%',
              borderTopLeftRadius: 10,
              overflow: 'hidden',
              borderTopRightRadius: 10,
            }}
          >
            <MapView
              mapType="standard"
              zoomEnabled={false}
              onLongPress={() => setModalVisible(true)}
              scrollEnabled={false}
              style={{ height: '100%', width: '100%' }}
              region={{
                longitude: long,
                latitude: lat,
                latitudeDelta: 0.05,
                longitudeDelta: 0.06,
              }}
            >
              <Marker
                coordinate={{
                  longitude: long,
                  latitude: lat,
                }}
              >
                <Ionicons
                  name="location"
                  size={40}
                  color="red"
                  style={{ opacity: 0.5 }}
                />
              </Marker>
            </MapView>
          </View>
          <View
            style={{
              height: '20%',
              backgroundColor: 'white',
              width: '100%',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Text
              style={{ alignSelf: 'center', fontSize: 19, fontWeight: '600' }}
            >
              Located at {region}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default CustomMapView;
