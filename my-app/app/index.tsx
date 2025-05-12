import { getReminders } from "@/services/reminderService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";
import "../global.css";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(),
  });

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Home Screen</Text>
    </View>
  );
}
