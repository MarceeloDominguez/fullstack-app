import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Link href={"/(protected)"} asChild>
        <Text className="text-blue-500">Go to Home</Text>
      </Link>
      <Link href="/(auth)/register" asChild>
        <Text className="text-blue-500">Register</Text>
      </Link>
    </View>
  );
}
