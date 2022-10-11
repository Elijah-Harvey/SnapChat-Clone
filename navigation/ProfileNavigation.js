import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import CameraScreen from '../screens/CameraScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import ChangeName from '../screens/ChangeName';

const Stack = createNativeStackNavigator();

const ProfileNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={CameraScreen} name="Camera" />
      <Stack.Screen component={ProfileScreen} name="Profile" />
      <Stack.Screen component={OnBoardingScreen} name="OnBoard" />
      <Stack.Screen component={ChangeName} name="Change" />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
