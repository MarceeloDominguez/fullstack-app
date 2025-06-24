import { InsertReminder, UpdateReminder } from "@/types/reminderTypes";
import * as SecureStore from "expo-secure-store";

export async function getReminders() {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/reminders`);
  if (!response.ok) {
    throw new Error("Failed to fetch reminders");
  }
  const data = await response.json();
  return data;
}

export async function getReminderByUser() {
  const token = await SecureStore.getItemAsync("token");

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/reminders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reminders by user ID");
  }

  const data = await response.json();
  return data;
}

export async function completeReminder(id: number, isCompleted: boolean) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/reminders/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: isCompleted }),
    }
  );

  if (!response.ok) {
    throw new Error("failed to update reminder");
  }

  const data = await response.json();
  return data;
}

export async function createReminder(newReminder: InsertReminder) {
  const token = await SecureStore.getItemAsync("token");

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/reminders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newReminder),
  });

  if (!response.ok) {
    throw new Error("Failed to create reminder");
  }

  const data = await response.json();
  return data;
}

export async function getReminderById(id: number) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/reminders/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reminder");
  }

  const data = await response.json();
  return data;
}

export async function updateOldReminder(
  id: number,
  updatedReminder: UpdateReminder
) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/reminders/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReminder),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update reminder");
  }

  const data = await response.json();
  return data;
}

export async function deleteReminder(id: number) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/reminders/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete reminder");
  }

  const data = await response.json();
  return data;
}
