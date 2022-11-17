import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../screens/ChatScreen';
import MessageScreen from '../screens/MessageScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RouteProfileScreen from '../screens/RouteProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';


const Stack = createStackNavigator();

const StoryNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        
      }}
    >
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={RouteProfileScreen} name="RouteProfile" />
      <Stack.Screen component={ProfileScreen} name="Profile" />
      <Stack.Screen component={ChatScreen} name="Chat" />
    </Stack.Navigator>
  );
};

export default StoryNavigator;
