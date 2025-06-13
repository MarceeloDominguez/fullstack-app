import ReminderListItem from "@/components/ReminderListItem";
import { useGetReminders } from "@/queries/reminder";
import { Reminder } from "@/types/reminderTypes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const importanceLevels = ["all", "low", "medium", "high"];

export default function HomeScreen() {
  const { data, error, isLoading } = useGetReminders();
  const [selectedImportance, setSelectedImportance] = useState("all");

  const handleImportanceChange = (importance: string) => {
    setSelectedImportance(importance);
  };

  let filteredData = data || [];

  if (data && selectedImportance !== "all") {
    filteredData = data.filter(
      (reminder: Reminder) => reminder.importance === selectedImportance
    );
  }

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
      <Link href="/(protected)/createUpdateReminder" asChild className="px-4">
        <Pressable className="flex-row items-center justify-between my-2">
          <Text className="text-2xl font-bold">Reminders</Text>
          <View className="flex-row items-center gap-2">
            <Link href="/(protected)/profile" asChild>
              <Ionicons name="person-outline" size={24} color="gray" />
            </Link>
            <Ionicons name="add-circle-outline" size={28} color="gray" />
          </View>
        </Pressable>
      </Link>
      <FlatList
        data={filteredData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="flex-row justify-between items-center py-3">
            <Text className="text-md font-semibold">Filter by Importance</Text>
            <View className="flex-row gap-1">
              {importanceLevels.map((importance) => (
                <Pressable
                  key={importance}
                  onPress={() => handleImportanceChange(importance)}
                  style={{
                    backgroundColor:
                      selectedImportance === importance
                        ? "rgba(3, 12, 22, 0.781)"
                        : "rgba(229, 231, 235, 0.5)",
                    ...styles.buttonImportance,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedImportance === importance ? "white" : "black",
                      textTransform: "capitalize",
                      ...styles.textButtonImportance,
                    }}
                  >
                    {importance}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        }
        contentContainerClassName="px-4"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonImportance: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  textButtonImportance: {
    fontSize: 12,
  },
});
