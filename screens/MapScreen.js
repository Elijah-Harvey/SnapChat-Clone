import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import MapView, { Marker } from 'react-native-maps';
import { db, usersCollection } from '../firebase';
import * as Location from 'expo-location';

const MapScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  useEffect(() => {
    const subscriber = usersCollection.onSnapshot((querySnapshot) => {
      const users = [];

      querySnapshot.forEach((documentSnapshot) => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setUsers(users);
    });

    return () => subscriber();
  }, [setUsers]);

  return (
    <View style={styles.container}>
      <Header
        rightIcon="settings-outline"
        title="Map"
        bgc="transparent"
        color="ghostwhite"
        onPress={() => navigation.navigate('Profile')}
        top={'10%'}
      />
      <MapView
        style={styles.map}
        mapType={'satellite'}
        zoomEnabled={true}
        scrollEnabled={true}
        showsUserLocation={true}
        followUserLocation={true}
        showsScale={true}
        customMapStyle={{}}
      >
        {users.map((e, i) => (
          <Marker
            pinColor={`${generateColor()}`}
            title={`${
              e.name === undefined || null ? e.Email : e.name
            }'s location`}
            key={i}
            coordinate={{
              latitude:
                e.location.latitude != undefined ? e.location.latitude : 0,
              longitude:
                e.location.longitude != undefined ? e.location.longitude : 0,
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
