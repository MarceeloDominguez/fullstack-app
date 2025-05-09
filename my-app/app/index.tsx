import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import "../global.css";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Link href={"/about" as any}>Hola Mundo</Link>
    </View>
  );
}
