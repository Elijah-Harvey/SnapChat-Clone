import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../screens/ChatScreen';
import MessageScreen from '../screens/MessageScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RouteProfileScreen from '../screens/RouteProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={MessageScreen} name="Message" />
      <Stack.Screen component={RouteProfileScreen} name="Profile" />
      <Stack.Screen component={ChatScreen} name="Chat" />
      <Stack.Screen component={ProfileScreen} name="Profiles" />
    
     
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
