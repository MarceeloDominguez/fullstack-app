import { completeReminder, getReminders } from "@/services/reminderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetReminders = () => {
  return useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(),
  });
};

export const useCompleteReminder = (
  onSucessCallback?: (completed: boolean) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ completed, id }: { completed: boolean; id: number }) =>
      completeReminder(id, completed),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      if (onSucessCallback) {
        onSucessCallback(data.completed);
      }
    },
    onError: (error) => {
      console.error("Error completing reminder", error);
    },
  });
};
