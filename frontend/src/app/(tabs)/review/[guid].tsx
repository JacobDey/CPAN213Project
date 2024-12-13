import { Game, Rating, Review } from "@constants/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "react-native-star-rating-widget";
import { addReview } from "@/slice/reviewSlice";

const ReviewDetailScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { guid } = useLocalSearchParams();
    const game: Game = useSelector((state: any) => state.game.currentGame);
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState<Rating>(0);

    const handleSubmit = () => {
        const newReview: Review = {
            id: Date.now(),
            gameGUID: guid as string,
            name: "abc",
            date: new Date().toISOString(),
            description: description || null,
            rating: rating,
        };
        dispatch(addReview(newReview));
        setRating(0);
        setDescription("");
        router.push(`/game/${game.guid}`);
    };

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
                onChangeText={(text) => setDescription(text)}
                placeholder="Write your review here..."
                style={styles.textInput}
            />

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Publish</Text>
            </Pressable>
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
