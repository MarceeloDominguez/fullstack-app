import {
  completeReminder,
  createReminder,
  deleteReminder,
  getReminderById,
  getReminders,
  updateOldReminder,
} from "@/services/reminderService";
import { InsertReminder, UpdateReminder } from "@/types/reminderTypes";
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

export const useReminderById = (id: number) => {
  return useQuery({
    queryKey: ["reminders", id],
    queryFn: () => getReminderById(Number(id)),
    enabled: !!id,
  });
};

export const useUpdateReminder = (
  reminderId: number,
  onSucessCallback?: () => void,
  onErrorCallback?: (error: Error) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newReminder: UpdateReminder) =>
      updateOldReminder(reminderId, newReminder),
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

export const useDeleteReminder = (
  reminderId: number,
  onSucessCallback?: () => void,
  onErrorCallback?: (error: Error) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteReminder(reminderId),
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
