import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DiagonalImageOverlay from "@components/DiagonalImageOverlay";
import GameDetail from "@components/GameDetail";
import { setGame } from "@/slice/gameSlice";
import { useEffect } from "react";

const GameDetailScreen = () => {
    const { guid } = useLocalSearchParams();
    const dispatch = useDispatch();
    const game = useSelector((state: any) => state.game.currentGame);

    useEffect(() => {
        const fetchGame = async () => {
            const API_KEY = "6a3bf0b716ef1215fdc265e43c14be3c6111a8bc";
            const URL = `https://www.giantbomb.com/api/game/${guid}/?api_key=${API_KEY}&format=json`;
            try {
                const response = await fetch(URL);
                const json = await response.json();
                if (response.ok) {
                    dispatch(setGame(json.results));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchGame();
    }, []);

    if (!game) return;
    return (
        <View style={styles.container}>
            <DiagonalImageOverlay image={game.image.screen_url} />
            <GameDetail game={game} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#282549",
        minHeight: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        paddingHorizontal: 15,
    },
    banner: {},
});

export default GameDetailScreen;
