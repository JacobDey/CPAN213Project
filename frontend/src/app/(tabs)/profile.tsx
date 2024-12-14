import React from "react";
import { Text, SafeAreaView, StyleSheet, TextInput, View, Image, TouchableOpacity, Animated} from "react-native";
import ProgressBar from "@components/ProgressBar";
import * as Progress from "react-native-progress";
import { useState, useEffect, useRef } from "react";
import LevelUpModal from "@components/LevelUpModal";
import { Stack, useRouter } from "expo-router";
import { useSelector } from "react-redux";

// image path
const imagePath = require('../../../assets/images/CriticXP_logo.png');

// main profile function
export default function Profile() {
    // state variables
    const [level, setLevel] = useState(0);
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState("blue");
    const [isLevelUpModalVisible, setLevelUpModalVisible] = useState(false);

    // toggle modal visibility
    const toggleLevelUpModal = () => {
        setLevelUpModalVisible(!isLevelUpModalVisible);
    };

    // handle level up
    const handleLevelUp = () => {
        toggleLevelUpModal(); 
    };

    // get user data from redux store
    const identity = useSelector((state: { user: { username: string } }) => state.user.username);
    const numReviews = useSelector((state: { user: { numberOfReviews: number } }) => state.user.numberOfReviews);

    // router and animation
    const router = useRouter();
    const imgHeight = useRef(new Animated.Value(170)).current;
      
    // home click animation
    function HomeClick() {
        Animated.sequence([
            Animated.timing(imgHeight, { toValue: 175, duration: 150, useNativeDriver: false }),
            Animated.timing(imgHeight, { toValue: 170, duration: 150, useNativeDriver: false }),
        ]).start(() => {
            router.push(`/game`)
        });
    }

    // use effect for progress and level calculation
    useEffect(() => {
        setProgress(numReviews % 10);
        setLevel(Math.floor(numReviews / 10));

        if (numReviews % 10 == 0) {
            handleLevelUp();
        }
        if (numReviews % 10 <= 3) {
            setColor("lightskyblue");
        } else if (numReviews % 10 <= 6) {
            setColor("deepskyblue");
        } else if (numReviews % 10 <= 10) {
            setColor("dodgerblue");
        }
    }, [numReviews]);

    // return view
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => HomeClick()}>
                <Animated.Image
                    style={{
                    width: undefined,      
                    height: imgHeight,     
                    aspectRatio: 1,        
                    resizeMode: 'contain', 
                    }}
                    source={imagePath}
                />
            </TouchableOpacity>
            <Text style={[styles.header, {margin:15}]}>{identity}</Text>
            <Text style={styles.subheader}>Level: {level}    Current Reviews: {numReviews}</Text>
            <Text style={styles.subheader}></Text>
            <ProgressBar progress={progress} color={color} barLength={10} />

            {/* LevelUpModal */}
            <LevelUpModal
                isModalVisible={isLevelUpModalVisible}
                toggleModal={toggleLevelUpModal}
                level={level}
            />
        </View>
    );
}

// styles
const styles = StyleSheet.create({
    text: { color: "white" },
    textInput: {
        borderWidth: 1,
    },
    header: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    subheader: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#282549",
        flex: 1,
        minHeight: "100%"
    },
});
