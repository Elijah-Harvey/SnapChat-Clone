import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomMapView = ({ region, lat, long, borderLeftColor, user, color }) => {
  return (
    <View style={{ left: 10 , marginTop: '5%'}}>
      <View style={{ bottom: '4%'}}>
        <Text style={{ fontWeight: '600', fontSize: 17,color, }}>{user}</Text>
      </View>
      <View
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CustomMapView;
