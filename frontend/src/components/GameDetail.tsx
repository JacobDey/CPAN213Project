import { Game } from "@constants/types";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Review } from "@constants/types";
import ReviewList from "./ReviewList";
import { Link } from "expo-router";

type GameDetailProps = {
    game: Game;
};

const GameDetail = ({ game }: GameDetailProps) => {
    const reviews = useSelector((state: any) => state.review.reviews).filter(
        (review: Review) => review.gameGUID === game.guid,
    );
    const [rating, setRating] = useState(0);
    const handleAddReview = () => {};

    useEffect(() => {
        if (reviews.length === 0) return;
        const totalRatings = reviews.reduce((sum: number, review: Review) => sum + review.rating, 0);
        setRating(totalRatings / reviews.length);
    }, [reviews]);

    return (
        <View style={styles.container}>
            <View style={styles.infoBlock}>
                <Image source={{ uri: game.image?.medium_url }} style={styles.image} resizeMode="cover" />
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{game.name}</Text>
                    <Text style={styles.releaseDateText}>{new Date(game.original_release_date).getFullYear()}</Text>
                </View>
            </View>

            <View style={styles.ratingAndButton}>
                <Link href={`/review/${game.guid}`} asChild>
                    <TouchableOpacity style={styles.addReviewButton} onPress={handleAddReview}>
                        <MaterialIcons name="add" size={16} color="black" style={styles.icon} />
                        <Text style={styles.addReviewButtonText}>Rate or Review</Text>
                    </TouchableOpacity>
                </Link>
                <StarRatingDisplay starStyle={styles.star} rating={rating} maxStars={5} starSize={20} color="#EC2626" />
            </View>

            <View style={styles.deckBlock}>
                <Text style={styles.deckText}>{game.deck}</Text>
            </View>

            <View style={styles.reviewContainer}>
                <Text style={styles.reviewHeader}>All Reviews</Text>
                <ReviewList reviews={reviews} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 75,
        padding: 15,
    },
    infoBlock: {
        flexDirection: "row",
        marginBottom: 20,
        flexWrap: "wrap",
    },
    image: {
        borderWidth: 1,
        borderRadius: 8,
        width: 120,
        aspectRatio: 0.75,
    },
    textContainer: {
        justifyContent: "center",
        marginLeft: 15,
        flex: 1,
    },
    nameText: {
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
    ratingAndButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "space-between",
    },
    addReviewButton: {
        backgroundColor: "#E9A6A6",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 6,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: 120,
    },
    addReviewButtonText: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 10,
    },
    star: {
        marginHorizontal: 0,
    },
    icon: {
        marginRight: 4,
    },
    deckBlock: {
        marginTop: 10,
    },
    deckText: {
        color: "white",
        fontSize: 12,
        marginTop: 10,
    },
    reviewHeader: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    reviewContainer: {
        flex: 1,
        marginTop: 30,
    },
});

export default GameDetail;
