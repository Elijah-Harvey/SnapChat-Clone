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
import { auth } from '../firebase';
import ProfileBox from '../components/ProfileBox';
import Ionicons from '@expo/vector-icons/Ionicons';
import RandomStreak from '../components/RandomStreak';

const RouteProfileScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
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
              uri: route.params.image,
            }}
            style={{ height: 150, width: 150, borderRadius: 100 / 2 }}
          />
          <Image
            source={require('../assets/pngwing.com.png')}
            style={{ height: 150, width: 150, position: 'absolute' }}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>
            {route.params.name ? route.params.name : route.params.email}
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
          }}
        >
          <Text style={{ fontWeight: '600' }}>
            {!route.params.name ? route.params.email : route.params.name}
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
        <ProfileBox
          iconName={'document-outline'}
          iconName2="close-outline"
          title={'Find friends on Snapchat'}
          subTitle={'Tap to sync your contacts'}
          subTitleShow={true}
          styleTitle={true}
        />
        <View style={{ top: '3%', left: '5%', flexDirection: 'row' }}>
          <Text style={{ fontSize: '20%', fontWeight: '600' }}>Stories</Text>
          <View
            style={{
              top: '3%',
              right: '7%',
              flexDirection: 'row',
              position: 'absolute',
              backgroundColor: '#e8edf2',
              width: '25%',
              alignItems: 'center',
              borderRadius: '10%',
              height: '100%',
            }}
          >
            <Ionicons
              name="add"
              size={20}
              style={{ left: '20%', color: '#4FAAF9' }}
            />
            <Text style={{ fontSize: '15%', fontWeight: '600', left: '20%' }}>
              New Story
            </Text>
          </View>
        </View>
        <ProfileBox
          style={{ top: '4%' }}
          iconColor="#4FAAF9"
          iconName={'camera-outline'}
          iconName2="ellipsis-vertical-outline"
          title={'Add to My Story'}
          styleTitle={{ alignSelf: 'center' }}
        />
        <ProfileBox
          style={{ top: '8%' }}
          iconColor="#4FAAF9"
          iconName={'camera-outline'}
          iconName2="ellipsis-vertical-outline"
          title={'Add to Our Story'}
          styleTitle={{ alignSelf: 'center' }}
        />
        <View style={{ top: '3%', left: '5%', flexDirection: 'row' }}>
          <Text style={{ fontSize: '20%', fontWeight: '600', top: '8%' }}>
            Friends
          </Text>
        </View>
        <ProfileBox
          style={{ top: '13%' }}
          iconName={'person-add-outline'}
          iconName2="chevron-forward-outline"
          title={'Add Friends'}
          styleTitle={{ alignSelf: 'center' }}
          iconStyle={{ transform: [{ rotateY: '180deg' }] }}
        />
        <ProfileBox
          style={{ top: '15%', height: '45%' }}
          iconName={'people-circle-outline'}
          iconName2="chevron-forward-outline"
          title={'My Friends'}
          styleTitle={{ bottom: '11%' }}
          iconStyle={{ bottom: '5%', position: 'absolute', left: '4%' }}
          iconStyle2={{ bottom: '5%', position: 'absolute', right: '4%' }}
          imageShow={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default RouteProfileScreen;
