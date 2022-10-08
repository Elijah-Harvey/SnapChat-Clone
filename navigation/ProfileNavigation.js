import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import OnboardingNavigator from './OnboardingNavigator';
import CameraScreen from '../screens/CameraScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';

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
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
