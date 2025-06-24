import CheckboxItem from "@/components/CheckboxItem";
import {
  useCreateReminder,
  useDeleteReminder,
  useReminderById,
  useUpdateReminder,
} from "@/queries/reminder";
import { InsertReminder, UpdateReminder } from "@/types/reminderTypes";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const importanceLavels = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export default function CreateUpdateReminder() {
  const { id: reminderId } = useLocalSearchParams();
  const [reminder, setReminder] = useState("");
  const [notes, setNotes] = useState("");
  const [importance, setImportance] = useState(importanceLavels[0].value);

  const { data, isLoading, error } = useReminderById(Number(reminderId));

  const { mutate: saveReminder, isPending } = useCreateReminder(() => {
    setReminder("");
    setNotes("");
    router.back();
  });

  const handleSaveReminder = () => {
    let reminderData: InsertReminder = {
      reminder,
      importance,
    };

    if (notes) {
      reminderData.notes = notes;
    }

    saveReminder(reminderData);
  };

  const { mutate: updateReminder } = useUpdateReminder(
    Number(reminderId),
    () => {
      router.back();
    }
  );

  const handleUpdate = () => {
    const newReminder: UpdateReminder = {
      reminder,
      notes,
      importance,
    };

    updateReminder(newReminder);
  };

  const { mutate: removeReminder } = useDeleteReminder(
    Number(reminderId),
    () => {
      router.back();
    }
  );

  const handleDeleteReminder = () => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeReminder();
            console.log("Reminder deleted");
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (data) {
      setReminder(data.reminder);
      setNotes(data.notes);
      setImportance(data.importance);
    }
  }, [data]);

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

  const isSaveButtonDisabled = () => isPending || reminder.length === 0;

  const onDonePressing = () => {
    if (reminderId) {
      return handleUpdate();
    }

    return handleSaveReminder();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: reminderId ? "Update Reminder" : "New Reminder",
          headerTitleAlign: "center",
          headerRight: () =>
            !!reminderId && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleDeleteReminder}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            ),
        }}
      />
      <Text style={styles.text}>Create Reminder</Text>
      <TextInput
        placeholder="What do you want to remember?"
        multiline
        numberOfLines={4}
        style={styles.textInput}
        value={reminder}
        onChangeText={(text) => setReminder(text)}
      />
      <Text style={styles.text}>Create Notes (optional)</Text>
      <TextInput
        placeholder="Add notes"
        multiline
        numberOfLines={4}
        style={styles.textInput}
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />
      <Text style={styles.text}>Select Importance (optional)</Text>
      <View>
        {importanceLavels.map((item) => (
          <CheckboxItem
            key={item.value}
            item={item}
            importance={importance}
            setImportance={setImportance}
          />
        ))}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onDonePressing}
        disabled={isSaveButtonDisabled()}
      >
        <Text style={styles.buttonText}>
          {reminderId ? "Update Reminder" : "Create Reminder"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: "semibold",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    height: 90,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "rgba(3, 12, 22, 0.781)",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    height: 40,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
