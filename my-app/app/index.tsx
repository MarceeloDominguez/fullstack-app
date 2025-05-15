import ReminderListItem from "@/components/ReminderListItem";
import { useGetReminders } from "@/queries/reminder";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function HomeScreen() {
  const { data, error, isLoading } = useGetReminders();

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
          <Link href="/createUpdateReminder" asChild>
            <Pressable className="flex-row items-center justify-between my-2">
              <Text className="text-2xl font-bold">Reminders</Text>
              <Ionicons name="add-circle-outline" size={28} color="gray" />
            </Pressable>
          </Link>
        }
        contentContainerClassName="px-4"
      />
    </SafeAreaView>
  );
}
