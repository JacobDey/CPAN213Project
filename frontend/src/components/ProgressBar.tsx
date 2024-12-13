import { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";

interface ProgressBarProps {
    color: string;
    barLength: number;
    progress: number;
}

const Progressbar = ({ color, barLength, progress }: ProgressBarProps) => {
    const animatedProgress = useRef(new Animated.Value(progress)).current;

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    return (
        <View style={{ width: "80%", height: 100 }}>
            <Animated.View
                style={[
                    styles.barNum,
                    {
                        paddingLeft: animatedProgress.interpolate({
                            inputRange: [0, barLength],
                            outputRange: ["0%", "100%"],
                        }),
                        transform: [{ translateX: -10 }],
                    },
                ]}
            >
                <Text style={styles.text}> {progress}</Text>
            </Animated.View>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            width: animatedProgress.interpolate({
                                inputRange: [0, barLength],
                                outputRange: ["0%", "100%"],
                            }),
                            backgroundColor: color,
                        },
                    ]}
                />
            </View>
        </View>
    );
};

export default Progressbar;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        width: "100%",
        padding: 10,
        height: 20,
        position: "relative",
        overflow: "hidden",
    },
    bar: {
        borderRadius: 5,
        position: "absolute",
        height: "100%",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    barNum: {
        borderRadius: 5,
        position: "absolute",
        top: 0,
        left: 0,
        marginTop: 7,
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        flexDirection: "row",
    },
    text: {},
});
