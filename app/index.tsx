import React from 'react';
//import { Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import AppNav from '../components/AppNav';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

export default function App() {
  return (
    //<NavigationContainer theme={DarkTheme}>
    <AppNav />
    //</NavigationContainer>
  );
}