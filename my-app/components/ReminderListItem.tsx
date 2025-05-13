import { ReminderListItemProps } from "@/types/reminderTypes";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ReminderListItem({
  reminderItem,
}: ReminderListItemProps) {
  const { reminder, notes, completed } = reminderItem;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => console.log("Reminder pressed")}
      style={styles.container}
    >
      <Ionicons name="checkmark-circle-outline" size={24} color="gray" />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.text}>
          {reminder}
        </Text>
        <Text numberOfLines={2} style={styles.notes}>
          {notes}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="gray" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
    gap: 10,
    elevation: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  notes: {
    fontSize: 13,
    fontWeight: "semibold",
    color: "#413e3e",
  },
  textContainer: {
    flex: 1,
  },
});
