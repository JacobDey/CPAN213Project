import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

export default function Login() {

  return(
    <SafeAreaView >
      <Text style={styles.text}>Login</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {color:"white"},
});