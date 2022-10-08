import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import Header from '../components/Header';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        rightIcon="settings-outline"
        title="Map"
        backgroundColor='gray'
        color= 'ghostwhite'
        onPress={() => navigation.navigate('Profile')}
      />
      <MapView
        style={styles.map}
        mapType={'standard'}
        zoomEnabled={true}
        scrollEnabled={true}
        showsUserLocation={true}
        followUserLocation={true}
        showsScale={true}
        initialRegion={{
          latitude: 30.3322,
          longitude: -81.6557,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={{ latitude: 30.3322, longitude: -81.6557 }} />
        <Marker coordinate={{ latitude: 32.7157, longitude: -117.1611 }} />
        <Marker coordinate={{ latitude: 41.824, longitude: -71.4128 }} />
        <Marker coordinate={{ latitude: 47.6062, longitude: -122.3321 }} />
        <Marker coordinate={{ latitude: 39.0119, longitude: -98.4842 }} />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
