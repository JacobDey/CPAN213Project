import GameList from "@components/GameList";
// import useState from react
import { useState } from "react";
// import view text stylesheet textinput pressable from react-native
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

// define HomeScreen component
const HomeScreen = () => {
    // state for query term
    const [queryTerm, setQueryTerm] = useState("");
    // state for games list
    const [games, setGames] = useState([]);

    // function to fetch games
    const fetchGames = async () => {
        // if no query term return
        if (!queryTerm) return;

        // api key and url for fetching games
        const API_KEY = "6a3bf0b716ef1215fdc265e43c14be3c6111a8bc";
        const URL = `https://www.giantbomb.com/api/search/?api_key=${API_KEY}&format=json&query=${queryTerm}&resources=game`;
        try {
            // fetch data from api
            const response = await fetch(URL);
            const json = await response.json();
            // if response is ok set games
            if (response.ok) {
                setGames(json.results || []);
            }
        } catch (error) {
            // log error to console
            console.error(error);
        }
    };

    return (
        // main container view
        <View style={styles.container}>
            // text for find a game
            <Text style={styles.text}>Find a game</Text>
            // text input for search query
            <TextInput style={styles.search} onChangeText={setQueryTerm} value={queryTerm} />
            // pressable button for search
            <Pressable onPress={fetchGames} style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
            // game list component
            <GameList games={games} />
        </View>
    );
}

// export HomeScreen component
export default HomeScreen;

// styles for the component
const styles = StyleSheet.create({
    container: {
        // container styles
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#282549",
        minHeight: "100%",
    },
    text: {
        // text styles
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
    },
    search: {
        // search input styles
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
        // search button styles
        backgroundColor: "#e9a6a6",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    searchButtonText: {
        // search button text styles
        fontSize: 16,
        fontWeight: "bold",
    },
});
