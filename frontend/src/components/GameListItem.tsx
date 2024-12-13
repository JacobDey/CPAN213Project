import { Text, Pressable, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import DefaultIcon from "@assets/images/icon.png";
import { Game } from "@constants/types";

type GameListItemProps = {
    game: Game;
};

const GameListItem = ({ game }: GameListItemProps) => {
    return (
        <Link href={`/${game.id}`} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={game.image?.thumb_url ? { uri: game.image.thumb_url } : DefaultIcon}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.text}>{game.name}</Text>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
        width: "50%",
        borderRadius: 8,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: "#ddd",
    },
    text: {
        color: "#E9A6A6",
        fontSize: 14,
        alignSelf: "flex-start",
    },
});

export default GameListItem;
