import { Text, TextInput, SafeAreaView, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../slices/userSlice";

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
                dispatch(login(usernameInput));
                console.log(identity);
                break;
            }
        }
        console.log("Login failure!");
    };

    const handleLogout = () => {
        console.log("Logout begin!");
        dispatch(logout());
    };

    return (
        <SafeAreaView>
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
    text: { color: "black" },
    textBox: { borderWidth: 1 },
});
