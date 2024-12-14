// import statements
import { Text, View, FlatList, StyleSheet } from "react-native";
import GameListItem from "./GameListItem";
import { Game } from "@constants/types";
import React from "react";

// type definitions
type GameListProps = {
    games: Game[];
}

// component definition
const GameList = ({ games = [] }: GameListProps) => {
    return (
        // container view
        <View style={styles.container}>
            <FlatList
                // data and rendering
                data={games}
                renderItem={({ item }) => <GameListItem game={item} />}
                // empty list component
                ListEmptyComponent={<Text style={styles.emptyText}>No games available</Text>}
                // key extractor
                keyExtractor={item => item.id.toString()}
                // layout
                numColumns={2}
            />
        </View>
    );
};

// styles
const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        flexDirection: "row",
    },
    emptyText: {

        textAlign: "center",
        marginTop: 20,
        color: "#888",
        fontSize: 16,
    },
});

export default GameList;
