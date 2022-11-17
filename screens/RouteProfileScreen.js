import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
  ScrollView,
  FlatList,
} from 'react-native';
import { auth, db, messageCollection, usersCollection } from '../firebase';
import ProfileBox from '../components/ProfileBox';
import Ionicons from '@expo/vector-icons/Ionicons';
import RandomStreak from '../components/RandomStreak';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { v4 as uuid } from 'uuid';
import ForYou from '../components/ForYou';
import SavedInChat from '../components/SavedInChat';

const RouteProfileScreen = ({ navigation, route }) => {
  const DUMMY_DATA = [
    {
      id: 1,
      title: 'Tanks',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      title: 'Wrestling',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      title: 'War',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      title: 'Long text about war',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      title: 'HEllo',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      title: 'WeIrD LoOkInG tExT',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 7,
      title: 'plus',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 8,
      title: 'a little',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 9,
      title: 'More',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 10,
      title: 'How does this look',
      time: '2hr ago',
      image: 'https://picsum.photos/200/300',
    },
  ];

  const [user, setUser] = useState({});
  const [otherU, setOtherU] = useState({});
  const [seconds, setSeconds] = useState(1);
  const [region, setRegion] = useState('Waiting...');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(coords);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
      }
    })();
  }, []);

  useEffect(() => {
    const subscriber = usersCollection
      .doc(route.params.uid)
      .get()
      .then(function (doc) {
        doc.exists ? setUser(doc.data()) : `doc doesnt exist`;
      });

    return () => subscriber;
  }, [usersCollection]);

  useEffect(() => {
    const subscriber = usersCollection
      .doc(auth.currentUser.uid)
      .get()
      .then(function (doc) {
        doc.exists ? setOtherU(doc.data()) : `doc doesnt exist`;
      });

    return () => subscriber;
  }, [usersCollection]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setRegion(user.address.city);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const mapId = uuid();

  const sendMessage = () => {
    messageCollection
      .doc(auth.currentUser.uid)
      .collection('Messages')
      .add({
        long: location ? location.longitude : 0,
        lat: location ? location.latitude : 0,
        region: `${address?.['city']}`,
        createdAt: new Date(),
        user: otherU.UID,
        id: mapId,
        room: [route.params.roomId, auth.currentUser.uid, route.params.uid],
      })
      .then(() => {
        messageCollection
          .doc(route.params.uid)
          .collection('Messages')
          .add({
            long: location ? location.longitude : 0,
            lat: location ? location.latitude : 0,
            region: `${address?.['city']}`,
            createdAt: new Date(),
            user: otherU.UID,
            id: mapId,
            room: [route.params.roomId, auth.currentUser.uid, route.params.uid],
          });
      });
  };

  const ListFooter = () => {
    return <View style={styles.headerFooterStyle} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containers} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 16, paddingBottom: 16, flex: 1 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.goBack({
                name: route.params.name,
                image: 'https://picsum.photos/200/300',
                number: route.params.Number,
                uid: route.params.uid,
                roomId: route.params.roomId,
                email: route.params.email,
                lat: route.params.lat,
                long: route.params.long,
                region: route.params.region,
              })
            }
            style={{ position: 'absolute', left: '5%', alignItems: 'center' }}
          >
            <Ionicons name="chevron-down-outline" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', right: '15%', alignItems: 'center' }}
          >
            <Ionicons name="person-circle-outline" size={40} color="#4FAAF9" />
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', right: '3%' }}>
            <Ionicons name="ellipsis-vertical-outline" size={35} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35%',
              alignSelf: 'center',
            }}
          >
            <Image
              source={{
                uri: 'https://picsum.photos/200/300',
              }}
              style={{ height: 150, width: 150, borderRadius: 150 / 2 }}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>
              {user?.name ? user.name : user?.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: '3%',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              height: '5%',
              paddingLeft: '25%',
              paddingRight: '25%',
              flex: 1,
            }}
          >
            <Text style={{ fontWeight: '600' }}>
              {!user.name ? user.email : user.name}
            </Text>
            <Text style={{ color: 'gray' }}>-</Text>
            <Text style={{ fontWeight: '600' }}>{RandomStreak()}</Text>
            <Text style={{ color: 'gray' }}>-</Text>
            <Ionicons
              name="reorder-three-outline"
              size={25}
              style={{ bottom: '1%', fontWeight: '600' }}
            />
          </View>
          <View style={{ left: '5%', bottom: 5 }}>
            <Text style={{ fontWeight: '600', fontSize: 17 }}>Snap Map</Text>
          </View>

          <View
            style={{
              height: 150,
              width: '90%',
              borderTopEndRadius: 10,
              overflow: 'hidden',
              alignSelf: 'center',
              borderTopLeftRadius: 10,
            }}
          >
            <MapView
              mapType="none"
              zoomEnabled={false}
              scrollEnabled={false}
              style={{ height: '100%', width: '100%' }}
              region={{
                longitude: location ? location.longitude : 0,
                latitude: location ? location.latitude : 0,
                latitudeDelta: 0.05,
                longitudeDelta: 0.06,
              }}
            >
              <Marker
                coordinate={{
                  longitude: location ? location.longitude : 0,
                  latitude: location ? location.latitude : 0,
                }}
              >
                <Image
                  source={require('../assets/bitmoji.png')}
                  style={{ height: 80, width: 80 }}
                />
              </Marker>
            </MapView>
          </View>
          <View
            style={{
              height: 50,
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'column',
              borderBottomColor: 'lightgrey',
              backgroundColor: 'white',
              shadowColor: 'gray',
              shadowOffset: { width: -0.1, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}
          >
            <Text
              style={{ left: '3%', fontWeight: '600', top: '10%' }}
            >{`${route.params.name} is in ${address?.['city']}`}</Text>
            <Text
              style={{
                left: '3%',
                fontWeight: '600',
                top: '9%',
                color: 'gray',
                opacity: 0.6,
              }}
            >
              Seen 2m ago
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              height: 80,
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              shadowColor: 'gray',
              shadowOffset: { width: -0.1, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            onLongPress={sendMessage}
            onPress={() =>
              navigation.navigate('Chat',{
                name: route.params.name,
                image: 'https://picsum.photos/200/300',
                number: route.params.Number,
                uid: route.params.uid,
                roomId: route.params.roomId,
                email: route.params.email,
                long: route.params.long,
                lat: route.params.lat,
                user: otherU.UID,
                mapId: mapId
              })
            }
          >
            <Ionicons
              name="location-outline"
              size={60}
              style={{
                color: 'gray',
                opacity: 0.6,
                position: 'absolute',
                left: '2%',
                top: '10%',
              }}
            />
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'center',
                left: '20%',
                position: 'absolute',
                fontWeight: '600',
              }}
            >
              Send My Location
            </Text>
          </TouchableOpacity>
              <View style={{ left: '5%', marginTop: 20, marginBottom: 20}}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>
                  Saved in Chat
                </Text>
              </View>
          <View
            style={{
              height: '100%',
              alignSelf: 'center',
              width: '90%',
              backgroundColor: 'white',
            }}
          >
            <FlatList
              ListFooterComponent={ListFooter}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={DUMMY_DATA}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <SavedInChat image={item.image} />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    height: '100%',
    
  },
  containers: {
    flex: 1,
  },
  headerFooterStyle: {
    height: 100,
  },
});

export default RouteProfileScreen;
