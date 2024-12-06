import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';

type RootStackParamList = {
    Home: undefined; // No params for the Home screen
    Profile: undefined; // No params for the Profile screen
    Login: undefined; // No params for the Login screen
  };
  
  const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNav() {
  const options = {
    headerTintColor: 'white',
    headerTitleAlign: "center", // Explicit typing
    // headerStyle: { backgroundColor: 'slategrey' },
    // headerTitleStyle: { fontWeight: 'bold' },
  } as const; // Explicit typing

  return (

      <Stack.Navigator>
        <Stack.Group screenOptions={options}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} options={{
            headerTitle: "App Name",
          }} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Group>
      </Stack.Navigator>

  );
}
