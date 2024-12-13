import { Game } from "@constants/types";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type GameDetailProps = {
    game: Game;
};

const GameDetail = ({ game }: GameDetailProps) => {
    const handleAddReview = () => {};

    return (
        <View style={styles.container}>
            {/* First Block: Image, Name, and Release Date */}
            <View style={styles.infoBlock}>
                <Image source={{ uri: game.image?.medium_url }} style={styles.image} resizeMode="cover" />
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{game.name}</Text>
                    <Text style={styles.releaseDateText}>{new Date(game.original_release_date).getFullYear()}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.addReviewButton} onPress={handleAddReview}>
                <MaterialIcons name="add" size={16} color="black" style={styles.icon} />
                <Text style={styles.addReviewButtonText}>Rate or Review</Text>
            </TouchableOpacity>
            {/* Second Block: Deck */}
            <View style={styles.deckBlock}>
                <Text style={styles.deckText}>{game.deck}</Text>
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
    addReviewButton: {
        width: 120,
        backgroundColor: "#E9A6A6",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 5,
        alignSelf: "flex-start",
        flexDirection: "row"
    },
    addReviewButtonText: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 10,
    },
    icon: {
        marginRight: 8,
    },
    deckBlock: {
        marginTop: 10,
    },
    deckText: {
        color: "white",
        fontSize: 12,
        marginTop: 10,
    },
});

export default GameDetail;
