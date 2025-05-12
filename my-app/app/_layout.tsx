import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="createUpdateReminder"
          options={{
            presentation: "modal",
            headerTitle: "New Reminder",
            headerLeft: () => (
              <Text className="text-red-500" onPress={() => router.back()}>
                Cancel
              </Text>
            ),
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
