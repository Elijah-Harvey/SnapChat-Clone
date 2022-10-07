import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import DiscoverHeader from '../components/DiscoverHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import DiscoverList from '../components/DiscoverList';
import WeatherBox from '../components/WeatherBox';
import HappeningNow from '../components/HappeningNow';

const DiscoverScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <DiscoverHeader
        title="Discover"
        rightIcon={'ellipsis-horizontal-outline'}
      />
      <HappeningNow />
      <WeatherBox />
        <View>
          <View>
            <Text style={styles.smallTitle}>Discover Subscriptions</Text>
            <DiscoverList />
          </View>
          <View>
            <View>
              <Text style={styles.smallTitle}>Trending Now</Text>
              <DiscoverList />
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.smallTitle}>Popular On SnapChat</Text>
              <DiscoverList />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  bigBox: {
    height: 230,
    width: 130,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
    borderRadius: 10,
    top: 20,
  },

  smallTitle: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    top: -10,
    left: 2,
    fontWeight: '600',
  },
  image: {
    height: 230,
    width: 130,
    borderRadius: 10,
  },
});

export default DiscoverScreen;
