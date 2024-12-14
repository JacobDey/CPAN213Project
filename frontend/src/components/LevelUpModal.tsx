import React, { useEffect } from 'react';
// importing necessary components from react-native
import { Button, SafeAreaView, Text, StyleSheet, Animated } from 'react-native';
// importing modal from react-native-modal
import Modal from 'react-native-modal'; // Importing react-native-modal

// defining props for the component
interface LevelUpModalProps {
  isModalVisible: boolean,
  toggleModal(): void,
  level: number,
}

export default function LevelUpModal({ isModalVisible, toggleModal, level }: LevelUpModalProps) {
  // animated value for bounce effect
  const bounceValue = new Animated.Value(0); // Animated value for bounce effect

  // function to trigger bounce animation
  const bounceIn = () => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  // function to reset bounce value
  const resetBounce = () => {
    bounceValue.setValue(0); // Reset the bounce value to 0
  };

  // useEffect to handle modal visibility changes
  useEffect(() => {
    if (isModalVisible) {
      bounceIn(); // Trigger bounce animation when modal is opened
    } else {
      resetBounce(); // Reset bounce animation when modal is closed
    }
  }, [isModalVisible]);

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => toggleModal()}
      style={styles.modal}
    >
      <SafeAreaView style={styles.modalContent}>
        <Animated.View
          style={[styles.animatedModalContent, { transform: [{ scale: bounceValue }] }]}
        >
          {level === 0 ? (
            <Text style={styles.modalText}>
              You're at level 0! Review 10 books to get your first level!
            </Text>
          ) : (
            <Text style={styles.modalText}>
              Congratulations! You've leveled up to Level {level}!
            </Text>
          )}
          <Button title="Close" onPress={toggleModal}/>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
}

// styles for the modal and its content
const styles = StyleSheet.create({
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
    textAlign: 'center',
    lineHeight: 24,
  },
  closeButton: {
    marginTop: 10,
  },
});
