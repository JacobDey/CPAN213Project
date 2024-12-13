import React, { useState, useEffect } from 'react';
import { Alert, Platform, Button, SafeAreaView, Text, StyleSheet, Animated } from 'react-native';
import Modal from 'react-native-modal'; // Importing react-native-modal
import { Easing } from 'react-native'; // Import Easing module

interface ReviewCongratsModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
}

interface AnimatedElement {
  translateY: Animated.Value;
  translateX: Animated.Value;
  opacity: Animated.Value;
  scale: Animated.Value;
  color?: string; // Optional color for circles
}

const ReviewCongratsModal: React.FC<ReviewCongratsModalProps> = ({ isModalVisible, toggleModal }) => {
  const [starAnimations, setStarAnimations] = useState<AnimatedElement[]>([]);
  const [circleAnimations, setCircleAnimations] = useState<AnimatedElement[]>([]);

  useEffect(() => {
    if (isModalVisible) {
      const stars: AnimatedElement[] = Array(10)
        .fill(null)
        .map(() => ({
          translateY: new Animated.Value(0),
          translateX: new Animated.Value(0),
          opacity: new Animated.Value(1),
          scale: new Animated.Value(0.5),
        }));

      const circles: AnimatedElement[] = Array(25)
        .fill(null)
        .map(() => ({
          translateY: new Animated.Value(0),
          translateX: new Animated.Value(0),
          opacity: new Animated.Value(1),
          scale: new Animated.Value(0.3),
          color: getRandomColor(), // Set random color for each circle
        }));

      setStarAnimations(stars);
      setCircleAnimations(circles);
      startConfettiAnimation(stars, circles);
    }
  }, [isModalVisible]);

  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const startConfettiAnimation = (stars: AnimatedElement[], circles: AnimatedElement[]) => {
    const animations = [
      ...stars.map((star) => {
        const randomX = Math.random() * 400 - 200;
        const randomUpwardHeight = Math.random() * -150 - 150;
        const fallDistance = Math.random() * 150 + 100;

        const fadeDuration = Math.random() * 200 + 500;

        return Animated.sequence([
          Animated.parallel([
            Animated.timing(star.translateY, {
              toValue: randomUpwardHeight,
              duration: 800,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(star.translateX, {
              toValue: randomX,
              duration: 800,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(star.scale, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(star.translateY, {
              toValue: randomUpwardHeight + fallDistance,
              duration: fadeDuration,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(star.translateX, {
              toValue: randomX,
              duration: fadeDuration,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(star.opacity, {
              toValue: 0,
              duration: fadeDuration,
              useNativeDriver: true,
            }),
          ]),
        ]);
      }),

      ...circles.map((circle) => {
        const randomX = Math.random() * 400 - 200;
        const randomUpwardHeight = Math.random() * -115 - 100;
        const fallDistance = Math.random() * 150 + 100;
        const fadeDuration = Math.random() * 200 + 500;

        return Animated.sequence([
          Animated.parallel([
            Animated.timing(circle.translateY, {
              toValue: randomUpwardHeight,
              duration: 800,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(circle.translateX, {
              toValue: randomX,
              duration: 800,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(circle.scale, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(circle.translateY, {
              toValue: randomUpwardHeight + fallDistance,
              duration: fadeDuration,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(circle.translateX, {
              toValue: randomX,
              duration: fadeDuration,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(circle.opacity, {
              toValue: 0,
              duration: fadeDuration,
              useNativeDriver: true,
            }),
          ]),
        ]);
      }),
    ];

    Animated.parallel(animations).start();
  };

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
      <SafeAreaView style={styles.modalContent}>
        {starAnimations.map((star, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.starEmoji,
              {
                transform: [
                  { translateY: star.translateY },
                  { translateX: star.translateX },
                  { scale: star.scale },
                ],
                opacity: star.opacity,
              },
            ]}
          >
            ⭐
          </Animated.Text>
        ))}

        {circleAnimations.map((circle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                transform: [
                  { translateY: circle.translateY },
                  { translateX: circle.translateX },
                  { scale: circle.scale },
                ],
                opacity: circle.opacity,
                backgroundColor: circle.color,
              },
            ]}
          />
        ))}

        <Text style={styles.modalText}>Congrats! 🎉 Thank you for leaving a review!</Text>
        <Button title="Close" onPress={toggleModal}/>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  starEmoji: {
    position: 'absolute',
    fontSize: 24, // Larger emoji size
    top: '50%',
    left: '50%',
  },
  circle: {
    position: 'absolute',
    width: 10, // Random size in the animation
    height: 10, // Random size in the animation
    backgroundColor: 'rgba(255, 165, 0, 0.7)', // Orange color for confetti
    borderRadius: 5, // Circular shape
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 24,
  },
  closeButton: {
    marginTop: 10,
  },
});

export default ReviewCongratsModal;
