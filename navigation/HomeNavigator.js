import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import DiscoverScreen from '../screens/DiscoverScreen';

import ProfileNavigator from './ProfileNavigation';
import MessageNavigator from './MessageNavigator';
import Lottie from 'lottie-react-native';
import StoryNavigator from './StoryNavigator';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ProfileNav"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let color;

          if (route.name === 'ProfileNav') {
            // iconName = focused ? 'camera' : 'camera-outline';
            // color = focused ? '#FFFC00' : '#6f7173';
            return (
              <Lottie source={require('../assets/Cam.json')} autoPlay loop />
            );
          } else if (route.name === 'Message') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
            color = focused ? '#2386FF' : '#6f7173';
          } else if (route.name === 'Map') {
            iconName = focused ? 'location' : 'location-outline';
            color = focused ? '#39CABE' : '#6f7173';
          } else if (route.name === 'Home') {
            iconName = focused ? 'people' : 'people-outline';
            color = focused ? '#CC4AFB' : '#6f7173';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'play' : 'play-outline';
            color = focused ? '#E21A33' : '#6f7173';
          }

          return <Ionicons name={iconName} size={35} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: 'transparent',
        },
        position: 'absolute',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: 'transparent',
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Message" component={MessageNavigator} />
      <Tab.Screen name="ProfileNav" component={ProfileNavigator} />
      <Tab.Screen name="Home" component={StoryNavigator} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
