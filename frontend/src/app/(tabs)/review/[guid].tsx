import { Game, Rating, Review } from "@constants/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "react-native-star-rating-widget";
import { addReview } from "@/slice/reviewSlice";
import ReviewCongratsModal from "@components/ReviewCongratsModal";
import ProgressBar from '@components/ProgressBar';
import { changeNumberOfReviews } from "@/slice/userSlice";
import LevelUpModal from "@components/LevelUpModal";

const ReviewDetailScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { guid } = useLocalSearchParams();
    const game: Game = useSelector((state: any) => state.game.currentGame);
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState<Rating>(0);
    // State for ReviewCongratsModal
    const [isCongratsModalVisible, setCongratsModalVisible] = useState(false);
    const [isLevelUpModalVisible, setLevelUpModalVisible] = useState(false);
    const identity = useSelector((state: { user: { username: string } }) => state.user.username);
    const numReviews = useSelector((state: { user: { numberOfReviews: number } }) => state.user.numberOfReviews);
    const [level, setLevel] = useState(Math.floor(numReviews / 10));

    const toggleCongratsModal = () => {
        setCongratsModalVisible(!isCongratsModalVisible);
    };

    const toggleLevelUpModal = () => {
        setLevelUpModalVisible(!isLevelUpModalVisible);
    };

    const handleCongrats = () => {
        toggleCongratsModal(); // Show ReviewCongratsModal
        if (isCongratsModalVisible) {
            setTimeout(() => {
                if (numReviews % 10 === 0) {
                toggleCongratsModal(); // Hide ReviewCongratsModal after 3 seconds
                }
                //PLAY LEVEL UP MODAL IF LEVEL UP HAPPEN
            }, 3000);
        }
    };

    // const handleLevelUp = () => {
    //     // setLevel((prevLevel) => prevLevel + 1); // Increment level
    //     setLevel(r)
    //     toggleLevelUpModal(); 
    // };

    const handleSubmit = () => {
        const newReview: Review = {
            id: Date.now(),
            gameGUID: guid as string,
            name: "abc",
            date: new Date().toISOString(),
            description: description || null,
            rating: rating,
            username: identity,
        };
        dispatch(changeNumberOfReviews(1));
        dispatch(addReview(newReview));
        setRating(0);
        setDescription("");
        router.push(`/game/${game.guid}`);
        handleCongrats();
    };

    //Review Progress Bar stuff below
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState('blue');

    useEffect(() => {
        if (description.length <= 60) {
          setColor('green');
        } else if (description.length <= 85) {
          setColor('gold');
        } else if (description.length < 100) {
          setColor('orange');
        } else if (description.length == 100) {
          setColor('red');
        }
        setProgress(description.length);
      }, [description]);

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>{game.name}</Text>
                    <Text style={styles.releaseDateText}>{new Date(game.original_release_date).getFullYear()}</Text>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingLabel}>Give your rating:</Text>
                        <StarRating
                            rating={rating}
                            onChange={(value) => setRating(value as Rating)}
                            maxStars={5}
                            starSize={24}
                            color="#E9A6A6"
                        />
                    </View>
                </View>

                <Image source={{ uri: game.image?.medium_url }} resizeMode="cover" style={styles.image} />
            </View>
            
            <TextInput
                editable
                multiline
                value={description}
                maxLength={100}
                onChangeText={(text) => setDescription(text)}
                placeholder="Write your review here..."
                style={styles.textInput}
            />
            <Text style={[styles.heading, {alignSelf: 'center'}]}>Character Limit: 100</Text>
            <View style={{width: '100%', alignItems: 'center'}} >
                <ProgressBar progress={progress} color={color} barLength={100}/>
            </View>
            

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Publish</Text>
            </Pressable>

            <ReviewCongratsModal
                isModalVisible={isCongratsModalVisible}
                toggleModal={toggleCongratsModal}
            />
        <LevelUpModal
            isModalVisible={isLevelUpModalVisible}
            toggleModal={toggleLevelUpModal}
            level={level}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#282549",
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    textContainer: {
        flex: 1,
        marginRight: 15,
    },
    heading: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        flexShrink: 1,
        maxWidth: "100%",
    },
    releaseDateText: {
        color: "white",
        fontSize: 14,
        marginTop: 5,
    },
    image: {
        borderWidth: 1,
        borderRadius: 8,
        width: 120,
        aspectRatio: 0.75,
    },
    ratingContainer: {
        marginTop: 30,
    },
    ratingLabel: {
        fontSize: 18,
        color: "white",
        marginBottom: 10,
    },
    textInput: {
        height: "100%",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        color: "rgba(255,255,255, 0.5)",
        backgroundColor: "#3D3B54",
    },
    submitButton: {
        backgroundColor: "#e9a6a6",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: "center",
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ReviewDetailScreen;
