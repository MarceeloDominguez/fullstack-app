import { useCreateReminder } from "@/queries/reminder";
import { InsertReminder } from "@/types/reminderTypes";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateUpdateReminder() {
  const [reminder, setReminder] = useState("");
  const [notes, setNotes] = useState("");

  const { mutate: saveReminder } = useCreateReminder(() => {
    setReminder("");
    setNotes("");
    router.back();
  });

  const handleSaveReminder = () => {
    let reminderData: InsertReminder = {
      reminder,
      userId: 1,
    };

    if (notes) {
      reminderData.notes = notes;
    }

    saveReminder(reminderData);
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleSaveReminder}
      >
        <Text style={styles.buttonText}>Create Reminder</Text>
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
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
