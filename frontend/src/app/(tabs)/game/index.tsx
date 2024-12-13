import GameList from "@components/GameList";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

 const HomeScreen = () => {
    const [queryTerm, setQueryTerm] = useState("");
    const [games, setGames] = useState([]);

    const fetchGames = async () => {
        if (!queryTerm) return;

        const API_KEY = "6a3bf0b716ef1215fdc265e43c14be3c6111a8bc";
        const URL = `https://www.giantbomb.com/api/search/?api_key=${API_KEY}&format=json&query=${queryTerm}&resources=game`;
        try {
            const response = await fetch(URL);
            const json = await response.json();
            if (response.ok) {
                setGames(json.results || []);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Find a game</Text>
            <TextInput style={styles.search} onChangeText={setQueryTerm} value={queryTerm} />
            <Pressable onPress={fetchGames} style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
            <GameList games={games} />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#282549",
        minHeight: "100%",
    },
    text: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
    },
    search: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "75%",
        backgroundColor: "#C4C4C4",
        color: "#424242",
        borderRadius: 20,
        marginBottom: 20,
    },
    searchButton: {
        backgroundColor: "#e9a6a6",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
