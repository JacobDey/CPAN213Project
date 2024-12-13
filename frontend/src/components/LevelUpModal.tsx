import React, { useEffect } from 'react';
import { Button, SafeAreaView, Text, StyleSheet, Animated } from 'react-native';
import Modal from 'react-native-modal'; // Importing react-native-modal

interface LevelUpModalProps {
  isModalVisible: boolean,
  toggleModal(): void,
  level: number,
}

export default function LevelUpModal({ isModalVisible, toggleModal, level }: LevelUpModalProps) {
  const bounceValue = new Animated.Value(0); // Animated value for bounce effect

  const bounceIn = () => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const resetBounce = () => {
    bounceValue.setValue(0); // Reset the bounce value to 0
  };

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
      style={styles.modal} // Apply modal-specific styles
    >
      <SafeAreaView style={styles.modalContent}>
        <Animated.View
          style={[styles.animatedModalContent, { transform: [{ scale: bounceValue }] }]} // Apply bounce animation
        >
          <Text style={styles.modalText}>
            Congratulations! You've leveled up to Level {level}!
          </Text>
          <Button title="Close" onPress={toggleModal}/>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
}

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
