// import statements
import { Tabs } from "expo-router";
import React from "react";
import TabBarBackground from "@components/ui/TabBarBackground";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text } from 'react-native';

// tab layout component
export default function TabLayout() {
    return (
        <Tabs
            // screen options
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#E9A6A6",
                tabBarBackground: TabBarBackground,
                tabBarStyle: {
                    backgroundColor: "#282549",
                    borderTopWidth: 0,
                },
                headerStyle: {
                    backgroundColor: "#282549",
                },
            }}
        >
            // tab screens
            <Tabs.Screen name="index" options={{ title: "Home", href: null }} />
            <Tabs.Screen
                name="game"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: "Login",
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="login" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
                }}
            />
            <Tabs.Screen
                name="review"
                options={{
                    title: "Review",
                    href: null,
                }}
            />
        </Tabs>
    );
}
