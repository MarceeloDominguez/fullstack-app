import {
  completeReminder,
  createReminder,
  getReminders,
} from "@/services/reminderService";
import { InsertReminder } from "@/types/reminderTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useGetReminders = () => {
  return useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(),
  });
};

export const useCompleteReminder = (
  onSucessCallback?: (completed: boolean) => void
) => {
  return useMutation({
    mutationFn: ({ completed, id }: { completed: boolean; id: number }) =>
      completeReminder(id, completed),
    onSuccess: (data) => {
      if (onSucessCallback) {
        onSucessCallback(data.completed);
      }
    },
    onError: (error) => {
      console.error("Error completing reminder", error);
    },
  });
};

export const useCreateReminder = (
  onSucessCallback?: () => void,
  onErrorCallback?: (error: Error) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reminderData: InsertReminder) => createReminder(reminderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      if (onSucessCallback) {
        onSucessCallback();
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message, [
        {
          text: "OK",
        },
      ]);
      if (onErrorCallback) {
        onErrorCallback(error);
      }
    },
  });
};
