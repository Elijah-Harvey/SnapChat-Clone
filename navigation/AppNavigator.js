import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeNavigator from './HomeNavigator';
import OnboardingNavigator from './OnboardingNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="OnBoardNav"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,

      }}
    >
      <Stack.Screen component={HomeNavigator} name="HomeNav" />
      <Stack.Screen component={OnboardingNavigator} name="OnBoardNav" />
    </Stack.Navigator>
  );
};

export default AppNavigator;
