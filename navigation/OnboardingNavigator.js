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

const Stack = createNativeStackNavigator();

const OnboardingNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="OnBoard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={OnBoardingScreen} name="OnBoard" />
      <Stack.Screen component={SignUpScreen} name="SignUp" />
      <Stack.Screen component={BirthdayScreen} name="Birth" />
      <Stack.Screen component={UsernameScreen} name="Name" />
      <Stack.Screen component={NumberScreen} name="Number" />
      <Stack.Screen component={LogInScreen} name="LogIn" />
      <Stack.Screen component={ForgotPasswordScreen} name="Password" />
      <Stack.Screen component={HomeNavigator} name="HomeNav" />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
