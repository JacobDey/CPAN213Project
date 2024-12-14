import { Text, SafeAreaView, StyleSheet, TextInput, View, Image, TouchableOpacity, Animated} from "react-native";
import ProgressBar from "@components/ProgressBar";
import * as Progress from "react-native-progress";
import { useState, useEffect, useRef } from "react";
import LevelUpModal from "@components/LevelUpModal";
import { Stack, useRouter } from "expo-router";
import { useSelector } from "react-redux";

const imagePath = require('../../../assets/images/CriticXP_logo.png');

// function ReviewText() {
//     const [progress, setProgress] = useState(0);
//     const [text, onChangeText] = useState("");
//     const [color, setColor] = useState("blue");

//     useEffect(() => {
//         if (text.length <= 60) {
//             setColor("green");
//         } else if (text.length <= 85) {
//             setColor("gold");
//         } else if (text.length < 100) {
//             setColor("orange");
//         } else if (text.length == 100) {
//             setColor("red");
//         }
//         setProgress(text.length);
//     }, [text]);
//     return (
//         <SafeAreaView
//             style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 backgroundColor: "#ecf0f1",
//                 alignItems: "center",
//             }}
//         >
//             <TextInput
//                 editable
//                 multiline
//                 numberOfLines={4}
//                 maxLength={100}
//                 onChangeText={(text) => onChangeText(text)}
//                 value={text}
//                 style={styles.textInput}
//                 placeholder="Enter your review here"
//             />
//             <Text>Character Limit: 100</Text>
//             <ProgressBar progress={progress} color={color} barLength={100} />
//         </SafeAreaView>
//     );
// }

export default function Profile() {
    //remove ReviewText after you move the function
    //const [numReviews, setNumReviews] = useState(25);
    const [level, setLevel] = useState(0);
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState("blue");


    const [isLevelUpModalVisible, setLevelUpModalVisible] = useState(false);
    // const [currentLevel, setCurrentLevel] = useState(1);

    const toggleLevelUpModal = () => {
        setLevelUpModalVisible(!isLevelUpModalVisible);
    };

    const handleLevelUp = () => {
        // setLevel((prevLevel) => prevLevel + 1); // Increment level
        toggleLevelUpModal(); 
    };

    const identity = useSelector((state: { user: { username: string } }) => state.user.username);
    const numReviews = useSelector((state: { user: { numberOfReviews: number } }) => state.user.numberOfReviews);

    const router = useRouter();
    const imgHeight = useRef(new Animated.Value(170)).current;
      
        function HomeClick() {
          Animated.sequence([
            Animated.timing(imgHeight, { toValue: 175, duration: 150, useNativeDriver: false }),
            Animated.timing(imgHeight, { toValue: 170, duration: 150, useNativeDriver: false }),
          ]).start(() => {
            router.push(`/game`)
          });
        }

    useEffect(() => {
        setProgress(numReviews % 10);
        setLevel(Math.floor(numReviews / 10));
        //above line might give wrong value: want it to be an integer, so it always rounds down when it divides by 10 (maybe ignore this, math.floor should work)
        //levels will be based in 10s

        if (numReviews % 10 == 0) {
            //animation for level up here
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
        fontSize: 24,
        fontWeight: "bold",
    },
    subheader: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        // flex: 1,
        // uncomment this out once you remove ReviewText
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#282549",
        flex: 1,
        minHeight: "100%"
        
    },
});
