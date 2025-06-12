import { router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";

export default function ProtectedLayout() {
  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        router.replace("/(auth)/login");
      }
    };
    checkToken();
  }, []);

  return (
    <Stack screenOptions={{ animation: "fade" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
