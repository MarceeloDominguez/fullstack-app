import { useRegisterUser } from "@/queries/auth";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: registerUser } = useRegisterUser();

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    registerUser(
      { name, email, password },
      {
        onSuccess: () => {
          Alert.alert("Registration successful!");
          router.back();
        },
        onError: (error) => {
          Alert.alert(`Registration failed: ${error.message}`);
        },
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-8">
      <Stack.Screen
        options={{
          title: "Register",
          headerTitleAlign: "center",
        }}
      />
      <View className="gap-6">
        <View>
          <Text className="font-bold">Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            className="border border-gray-300 rounded-md mt-2"
          />
        </View>
        <View>
          <Text className="font-bold">Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            className="border border-gray-300 rounded-md mt-2"
          />
        </View>
        <View>
          <Text className="font-bold">Password:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            className="border border-gray-300 rounded-md mt-2"
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-500">Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Text className="font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(3, 12, 22, 0.781)",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 50,
    height: 40,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
