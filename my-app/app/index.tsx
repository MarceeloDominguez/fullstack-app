import ReminderListItem from "@/components/ReminderListItem";
import { getReminders } from "@/services/reminderService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(),
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center">
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center">
        <Text className="text-red-500 text-center">
          An error occurred while fetching reminders.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text className="text-2xl font-bold text-center mb-2">Reminders</Text>
        }
        contentContainerClassName="px-4"
      />
    </SafeAreaView>
  );
}
