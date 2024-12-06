import { SafeAreaView, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
    Login: undefined;
  };

  type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


export default function Home({ navigation }: HomeProps) {
  return(
    <SafeAreaView>
      <Button title="Profile" onPress={() => {
        navigation.navigate("Profile");
      }} />
      <Button title="Login" onPress={() => {
        navigation.navigate("Login");
      }} />
    </SafeAreaView>
  )
}

// const styles = StyleSheet.create({
//   text: {color:"white"},
// });
