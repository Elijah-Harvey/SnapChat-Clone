import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../screens/ChatScreen';
import MessageScreen from '../screens/MessageScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ProfileNavigator = ({ user }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={MessageScreen} name="Message" />
      <Stack.Screen component={ChatScreen} name="Chat" key={user}/>
     
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
