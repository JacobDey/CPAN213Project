import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const GameDetailScreen = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>{id}</Text>
        </View>
    );
};

export default GameDetailScreen;
