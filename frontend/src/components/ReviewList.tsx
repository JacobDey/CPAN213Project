// import statements
import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import ReviewListItem from "./ReviewListItem";
import { Review } from "@constants/types";

// type definition for props
type ReviewListProps = {
    reviews: Review[];
};

// review list component
const ReviewList = ({ reviews }: ReviewListProps) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewListItem review={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 5 }}
                scrollEnabled={true}
                ListEmptyComponent={<Text style={styles.emptyText}>No reviews available</Text>}
            />
        </View>
    );
};

// styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        columnGap: 10,
        paddingTop: 10,
        borderTopWidth: 2,
        borderTopColor: "#757575",
    },
    emptyText: {
        textAlign: "center",
        color: "#888",
        fontSize: 16,
        marginTop: 20,
    },
});

// export statement
export default ReviewList;
