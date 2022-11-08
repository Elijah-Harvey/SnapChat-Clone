import 'react-native-gesture-handler';
import 'react-native-get-random-values'
import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navigationRef } from './navigation/rootNavigation';
import AppNavigator from './navigation/AppNavigator';
import Birthday from './screens/BirthdayScreen';
import UsernameScreen from './screens/UsernameScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Feed" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
