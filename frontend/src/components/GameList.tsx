import { Text, View, FlatList, StyleSheet } from "react-native";
import GameListItem from "./GameListItem";
import { Game } from "@constants/types";

type GameListProps = {
    games: Game[];
}

const GameList = ({ games = [] }: GameListProps) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={games}
                renderItem={({ item }) => <GameListItem game={item} />}
                ListEmptyComponent={<Text style={styles.emptyText}>No games available</Text>}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
            />
        </View>
    );
};

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
