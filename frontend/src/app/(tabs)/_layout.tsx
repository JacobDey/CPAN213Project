import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import TabBarBackground from "@components/ui/TabBarBackground";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#E9A6A6",
                tabBarBackground: TabBarBackground,
                tabBarStyle: {
                    backgroundColor: "#1f1d36",
                },
            }}
        >
            <Tabs.Screen name="index" options={{ href: null }} />
            <Tabs.Screen
                name="game"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                }}
            />
        </Tabs>
    );
}
