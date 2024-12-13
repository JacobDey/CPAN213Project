import React, { useState, useEffect } from 'react';
import { Alert, Platform, Button, SafeAreaView, Text, StyleSheet, Animated } from 'react-native';
import Modal from 'react-native-modal'; // Importing react-native-modal

// LevelUpModal component to handle platform check and showing either modal or alert
export default function LevelUpModal({ level }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [bounceValue] = useState(new Animated.Value(0)); // Animated value for bounce effect

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Animation for bouncing the modal
  const bounceIn = () => {
    // Bounce animation: start at scale 0, then scale to 1 with a slight bounce
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 3,  // Controls the bounce effect
      tension: 100, // Controls the speed of the bounce
      useNativeDriver: true,
    }).start();
  };

  // Reset bounce animation when modal is closed
  const resetBounce = () => {
    bounceValue.setValue(0); // Reset the bounce value to 0
  };

  // Show the level-up modal or alert
  const showLevelUp = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      // Show Alert for iOS and Android (mobile platforms)
      Alert.alert(
        "Level Up!",
        `Congratulations! You've leveled up to Level ${level}!`,
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      );
    } else {
      // Show Modal for non-mobile platforms (like web)
      toggleModal();
    }
  };

  // Trigger the bounce animation when modal becomes visible
  useEffect(() => {
    if (isModalVisible) {
      bounceIn(); // Trigger bounce animation when the modal is opened
    } else {
      resetBounce(); // Reset bounce animation when the modal is closed
    }
  }, [isModalVisible]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Button to trigger level-up                                         ***** LEVEL UP TEMP BUTTON HERE, REPLACE WITH DYNAMIC CALL ON LEVEL UP ***** */}                                                                
      <Button title="Simulate Level Up" onPress={showLevelUp} />

      {/* Modal for non-mobile platforms with bounce animation */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal} // Apply modal-specific styles
      >
        <SafeAreaView style={styles.modalContent}>
          {/* Animated View for dynamic effect */}
          <Animated.View
            style={[styles.animatedModalContent, { transform: [{ scale: bounceValue }] }]} // Apply bounce animation
          >
            <Text style={styles.modalText}>
              Congratulations! You've leveled up to Level {level}!
            </Text>
            <Button title="Close" onPress={toggleModal} style={styles.closeButton} />
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0, // Adjust modal margin to be centered
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust width for better layout
    alignItems: 'center', // Center content inside modal
  },
  animatedModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 10,
    marginBottom: 10, // Add some space between text and button
    textAlign: 'center', // Center the text horizontally
    lineHeight: 24, // Helps with centering vertically (adjust as needed)
    flexWrap: 'wrap', // Ensure text wraps if it's too long
  },
  closeButton: {
    marginTop: 10,
  },
});

