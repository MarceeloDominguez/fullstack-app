import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const importanceColors: Record<string, string> = {
  low: "#00FF00",
  medium: "#FFFF00",
  high: "#FF0000",
};

type CheckboxItemProps = {
  item: { label: string; value: string };
  importance: string;
  setImportance: (value: string) => void;
};

export default function CheckboxItem({
  item,
  importance,
  setImportance,
}: CheckboxItemProps) {
  return (
    <TouchableOpacity
      key={item.value}
      style={styles.containerCheckbox}
      activeOpacity={0.7}
      onPress={() => setImportance(item.value)}
    >
      <View
        style={{
          ...styles.checkbox,
          backgroundColor:
            importance === item.value ? importanceColors[item.value] : "white",
        }}
      />
      <Text style={styles.checkboxText}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
