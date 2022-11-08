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
} from 'react-native';
import { auth, usersCollection } from '../firebase';
import ProfileBox from '../components/ProfileBox';
import Ionicons from '@expo/vector-icons/Ionicons';
import RandomStreak from '../components/RandomStreak';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const RouteProfileScreen = ({ navigation, route }) => {
  const [user, setUser] = useState({});
  const [seconds, setSeconds] = useState(4);
  const [region, setRegion] = useState();

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
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 4) {
        setRegion('Waiting...');
      }
      if (seconds === 0) {
        setRegion(user.address.city);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containers}>
        <View style={{ paddingTop: 16, paddingBottom: 16, flex: 1 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chat', {
                name: route.params.name,
                image: 'https://picsum.photos/200/300',
                number: route.params.Number,
                uid: route.params.uid,
                roomId: route.params.roomId,
                email: route.params.email,
              })
            }
            style={{ position: 'absolute', left: '5%', alignItems: 'center' }}
          >
            <Ionicons name="chevron-down-outline" size={'35%'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', right: '15%', alignItems: 'center'}}
          >
            <Ionicons name="person-circle-outline" size={'40%'} color='#4FAAF9' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', right: '3%' }}
          >
            <Ionicons name="ellipsis-vertical-outline" size={'35%'} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
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
              {user?.name ? user?.name : user?.email}
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
              size={'25%'}
              style={{ bottom: '1%', fontWeight: '600' }}
            />
          </View>
          <View style={{ left: '5%', bottom: '3%' }}>
            <Text style={{ fontWeight: '600', fontSize: '17%' }}>Snap Map</Text>
          </View>

          <View
            style={{
              height: '55%',
              width: '90%',
              borderTopEndRadius: '10%',
              overflow: 'hidden',
              alignSelf: 'center',
              borderTopLeftRadius: '10%',
            }}
          >
            <MapView
            mapType='terrain'
              style={{ height: '100%', width: '100%' }}
              region={{
                longitude: user?.location?.longitude,
                latitude: user?.location?.latitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.06,
              }}
            >
              <Marker
                coordinate={{
                  longitude: user?.location?.longitude,
                  latitude: user?.location?.latitude,
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
              height: '17%',
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
            >{`${route.params.name} is in ${region}`}</Text>
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
          <View
            style={{
              backgroundColor: 'white',
              height: '30%',
              width: '90%',
              alignSelf: 'center',
              borderBottomLeftRadius: '10%',
              borderBottomRightRadius: '10%',
              justifyContent: 'center',
              flexDirection: 'row',
              shadowColor: 'gray',
              shadowOffset: { width: -0.1, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}
          >
            <Ionicons
              name="location-outline"
              size={'60%'}
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
                fontSize: '18%',
                alignSelf: 'center',
                left: '20%',
                position: 'absolute',
                fontWeight: '600',
              }}
            >
              Send My Location
            </Text>
          </View>
          <View style={{ top: '7%', left: '5%' }}>
            <Text style={{ fontSize: '18%', fontWeight: '600' }}>
              Saved in Chat
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              top: '10%',
              height: '100%',
              alignSelf: 'center',
              width: '90%',
              backgroundColor: 'white',
            }}
          ></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  containers: {
    flex: 1,
  },
  contentContainer: {},
});

export default RouteProfileScreen;
