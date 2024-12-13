import { Text, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import ProgressBar from "@components/ProgressBar";
import * as Progress from "react-native-progress";
import { useState, useEffect } from "react";

function ReviewText() {
    const [progress, setProgress] = useState(0);
    const [text, onChangeText] = useState("");
    const [color, setColor] = useState("blue");

    useEffect(() => {
        if (text.length <= 60) {
            setColor("green");
        } else if (text.length <= 85) {
            setColor("gold");
        } else if (text.length < 100) {
            setColor("orange");
        } else if (text.length == 100) {
            setColor("red");
        }
        setProgress(text.length);
    }, [text]);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#ecf0f1",
                alignItems: "center",
            }}
        >
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={100}
                onChangeText={(text) => onChangeText(text)}
                value={text}
                style={styles.textInput}
                placeholder="Enter your review here"
            />
            <Text>Character Limit: 100</Text>
            <ProgressBar progress={progress} color={color} barLength={100} />
        </SafeAreaView>
    );
}

export default function Profile() {
    //remove ReviewText after you move the function
    const [numReviews, setNumReviews] = useState(9);
    const [level, setLevel] = useState(0);
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState("blue");

    useEffect(() => {
        setProgress(numReviews % 10);
        setLevel(Math.floor(numReviews / 10));
        //above line might give wrong value: want it to be an integer, so it always rounds down when it divides by 10 (maybe ignore this, math.floor should work)
        //levels will be based in 10s

        if (numReviews % 10 == 0) {
            //animation for level up here
        }
        if (numReviews % 10 <= 3) {
            setColor("lightskyblue");
        } else if (numReviews % 10 <= 6) {
            setColor("deepskyblue");
        } else if (numReviews % 10 <= 10) {
            setColor("dodgerblue");
        }
    }, [numReviews]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>/Username/</Text>
            <Text style={styles.header}>Current Reviews: {numReviews}</Text>
            <Text style={styles.header}>Level: {level}</Text>
            <ProgressBar progress={progress} color={color} barLength={10} />
        </View>

        // {/* <ReviewText /> */}
    );
}

const styles = StyleSheet.create({
    text: { color: "white" },
    textInput: {
        borderWidth: 1,
    },
    header: {
        color: "white",
        fontSize: 16,
    },
    container: {
        // flex: 1,
        // uncomment this out once you remove ReviewText
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#282549",
        flex: 1,
        minHeight: "100%",
    },
});
