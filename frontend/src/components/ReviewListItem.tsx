// import statements
import { View, Text, StyleSheet } from "react-native";
import { Review } from "@constants/types";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { useSelector } from "react-redux";
import React from "react";

// type definition for props
type ReviewListItemProps = {
    review: Review;
};

// functional component
const ReviewListItem = ({ review }: ReviewListItemProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.reviewBy}>Review by </Text>
                <Text style={styles.name}>{review.username}</Text>
                <StarRatingDisplay
                    starStyle={styles.star}
                    starSize={16}
                    maxStars={5}
                    rating={review.rating}
                    color="#EC2626"
                />
            </View>
            {review.description && <Text style={styles.description}>{review.description}</Text>}
        </View>
    );
};

// styles
const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 15,
        padding: 10,
        backgroundColor: "rgba(233, 166, 166, 0.05)",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        maxHeight: 120,
    },
    header: {
        flexDirection: "row",
        marginBottom: 5,
        alignItems: "center",
    },
    reviewBy: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.5)",
    },
    name: {
        fontSize: 14,
        color: "#E9A6A6",
        marginRight: 5,
    },
    star: {
        marginHorizontal: -2,
    },
    date: {
        fontSize: 12,
        color: "#888",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    description: {
        fontSize: 12,
        color: "white",
    },
});

// export statement
export default ReviewListItem;