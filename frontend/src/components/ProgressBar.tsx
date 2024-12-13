import { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

export default function Progressbar(props) {
  const animatedProgress = useRef(new Animated.Value(props.progress)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: props.progress,
      duration: 500,
    }).start();
  },  [props.progress]);

  return (
    <View style={{ width: '80%', height: '100px' }}>
      <Animated.View
        style={[
          styles.barNum,
          {
            paddingLeft: animatedProgress.interpolate({
              inputRange: [0, props.barLength],
              outputRange: ['0%', '100%'],
            }),
            transform: [{ translateX: -10 }],
          },
        ]}>
        <Text style={styles.text}> {props.progress}</Text>
      </Animated.View>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.bar,
            {
              width: animatedProgress.interpolate({
                inputRange: [0, props.barLength],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: props.color,
            },
          ]}></Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    padding: '10px',
    height: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  bar: {
    borderRadius: 5,
    position: 'absolute',
    height: "100%",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  barNum: {
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '20px',
    marginTop: '7px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
