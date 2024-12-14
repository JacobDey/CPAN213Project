import { Text, TextInput, SafeAreaView, StyleSheet, Button, View, Alert } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../slice/userSlice";
import React from "react";

export default function LoginScreen() {
    // mockup user database
    const validUsers = [
        { username: "username", password: "password" },
        { username: "john", password: "smith" },
    ];
    const [usernameInput, onChangeUsernameInput] = useState("");
    const [passwordInput, onChangePasswordInput] = useState("");
    const dispatch = useDispatch();
    const identity = useSelector((state: { user: { username: string } }) => state.user.username);

    const handleLogin = () => {
        for (let i = 0; i < validUsers.length; i++) {
            if (usernameInput === validUsers[i].username && passwordInput === validUsers[i].password) {
                dispatch(login(usernameInput));
                Alert.alert("Login Successful", `Welcome, ${usernameInput}!`);
                break;
            }
        }
        
    };

    const handleLogout = () => {
        console.log("Logout begin!");
        dispatch(logout());
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Login (Username: "john" Password: "smith")</Text>
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
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} />
                <Button title="Logout" onPress={handleLogout} />
            </View>
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
    // Mandatory flexbox usage
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
});