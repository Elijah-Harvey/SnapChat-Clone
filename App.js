import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeNavigator from './navigation/HomeNavigator';
import OnBoardingScreen from './screens/OnBoardingScreen';
import { navigationRef } from './navigation/rootNavigation';
import OnboardingNavigator from './navigation/OnboardingNavigator';
import AppNavigator from './navigation/AppNavigator';

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
