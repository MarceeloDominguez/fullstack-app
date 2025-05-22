import { useCompleteReminder } from "@/queries/reminder";
import { ReminderListItemProps } from "@/types/reminderTypes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ReminderListItem({
  reminderItem,
}: ReminderListItemProps) {
  const { reminder, notes, completed, id, importance } = reminderItem;
  const [isCompleted, setIsCompleted] = useState(completed);

  const { mutate: completeTask } = useCompleteReminder((newStatus) => {
    setIsCompleted(newStatus);
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => completeTask({ completed: !isCompleted, id: Number(id) })}
      style={styles.container}
    >
      {isCompleted ? (
        <Ionicons name="checkmark-circle-outline" size={24} color="green" />
      ) : (
        <Ionicons name="add-circle-outline" size={24} color="gray" />
      )}

      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.text}>
          {reminder}
        </Text>
        {!!notes && (
          <Text numberOfLines={2} style={styles.notes}>
            {notes}
          </Text>
        )}
        <Text>{importance}</Text>
      </View>
      <Link href={`/createUpdateReminder?id=${id}`} asChild>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="gray"
          style={{ padding: 8 }}
        />
      </Link>
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
