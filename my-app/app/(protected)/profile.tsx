import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Alert, SafeAreaView } from "react-native";

export default function ProfileScreen() {
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    router.replace("/(auth)/login");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: logout,
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={24}
              color="gray"
              onPress={handleLogout}
            />
          ),
        }}
      />
    </SafeAreaView>
  );
}
