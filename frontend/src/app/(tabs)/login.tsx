import { Text, TextInput, SafeAreaView, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../slice/userSlice";

export default function LoginScreen() {
    // mockup user database
    const validUsers = [
        { username: "lopocozo", password: "tulips" },
        { username: "jacob", password: "spicybread" },
    ];
    const [usernameInput, onChangeUsernameInput] = useState("");
    const [passwordInput, onChangePasswordInput] = useState("");
    const dispatch = useDispatch();
    const identity = useSelector((state: { user: { username: string } }) => state.user.username);

    const handleLogin = () => {
        console.log("Process begin!");
        for (let i = 0; i < validUsers.length; i++) {
            if (usernameInput === validUsers[i].username && passwordInput === validUsers[i].password) {
                console.log("Login successful!");
                console.log(usernameInput);
                dispatch(login(usernameInput));
                console.log(identity);
                break;
            }
            console.log("Login failure!");
        }
        
    };

    const handleLogout = () => {
        console.log("Logout begin!");
        dispatch(logout());
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <TextInput
                placeholder="Enter your username here!"
                style={styles.textBox}
                onChangeText={onChangeUsernameInput}
                value={usernameInput}
            />
            <TextInput
                placeholder="Enter your password here!"
                style={styles.textBox}
                onChangeText={onChangePasswordInput}
                value={passwordInput}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Logout" onPress={handleLogout} />
            {identity && <Text style={styles.text}>Welcome, {identity}</Text>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#282549",
        minHeight: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
    },
    text: { 
        color: "white",
        fontSize: 24,
        marginBottom: 20,
    },
    textBox: { 
        borderWidth: 1,
        borderColor: "white",
        color: "white",
        width: "80%",
        padding: 10,
        marginBottom: 20,
    },
});