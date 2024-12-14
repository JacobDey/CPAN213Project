import React, { useState, useEffect } from 'react';
// import necessary modules
import { Alert, Platform, Button, SafeAreaView, Text, StyleSheet, Animated } from 'react-native';
import Modal from 'react-native-modal'; // importing react-native-modal
import { Easing } from 'react-native'; // import easing module

// define props interface
interface ReviewCongratsModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
}

// define animated element interface
interface AnimatedElement {
  translateY: Animated.Value;
  translateX: Animated.Value;
  opacity: Animated.Value;
  scale: Animated.Value;
  color?: string; // optional color for circles
}

// functional component
const ReviewCongratsModal: React.FC<ReviewCongratsModalProps> = ({ isModalVisible, toggleModal }) => {
  // state for star and circle animations
  const [starAnimations, setStarAnimations] = useState<AnimatedElement[]>([]);
  const [circleAnimations, setCircleAnimations] = useState<AnimatedElement[]>([]);

  // useEffect to start animations when modal is visible
  useEffect(() => {
    if (isModalVisible) {
      // initialize star animations
      const stars: AnimatedElement[] = Array(10)
        .fill(null)
        .map(() => ({
          translateY: new Animated.Value(0),
          translateX: new Animated.Value(0),
          opacity: new Animated.Value(1),
          scale: new Animated.Value(0.5),
        }));

      // initialize circle animations with random colors
      const circles: AnimatedElement[] = Array(25)
        .fill(null)
        .map(() => ({
          translateY: new Animated.Value(0),
          translateX: new Animated.Value(0),
          opacity: new Animated.Value(1),
          scale: new Animated.Value(0.3),
          color: getRandomColor(), // set random color for each circle
        }));

      // set state
      setStarAnimations(stars);
      setCircleAnimations(circles);
      // start confetti animation
      startConfettiAnimation(stars, circles);
    }
  }, [isModalVisible]);

  // function to get random color
  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // function to start confetti animation
  const startConfettiAnimation = (stars: AnimatedElement[], circles: AnimatedElement[]) => {
    const animations = [
      // star animations
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

      // circle animations
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

    // start animations
    Animated.parallel(animations).start();
  };

  // render modal
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
      <SafeAreaView style={styles.modalContent}>
        {/* render star animations */}
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

        {/* render circle animations */}
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

        {/* modal text and close button */}
        <Text style={styles.modalText}>Congrats! 🎉 Thank you for leaving a review!</Text>
        <Button title="Close" onPress={toggleModal}/>
      </SafeAreaView>
    </Modal>
  );
};

// styles
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
    fontSize: 24, // larger emoji size
    top: '50%',
    left: '50%',
  },
  circle: {
    position: 'absolute',
    width: 10, // random size in the animation
    height: 10, // random size in the animation
    backgroundColor: 'rgba(255, 165, 0, 0.7)', // orange color for confetti
    borderRadius: 5, // circular shape
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
