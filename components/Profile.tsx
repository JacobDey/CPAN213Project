import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

export default function Profile() {
  return(
    <SafeAreaView>
      <Text style={styles.text}>Profile</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {color:"white"},
});