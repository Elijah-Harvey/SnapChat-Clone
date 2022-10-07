import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import BirthdayScreen from '../screens/BirthdayScreen';
import HomeNavigator from './HomeNavigator';
import UsernameScreen from '../screens/UsernameScreen';
import NumberScreen from '../screens/NumberScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingNavigator from './OnboardingNavigator';
import CameraScreen from '../screens/CameraScreen';

const Stack = createNativeStackNavigator();

const ProfileNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Camera"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={CameraScreen} name="Camera" />
      <Stack.Screen component={ProfileScreen} name="Profile" />
      <Stack.Screen component={OnboardingNavigator} name="OnBoardNav" />
    </Stack.Navigator>
  );
};

export default ProfileNavigator