import { InsertReminder, UpdateReminder } from "@/types/reminderTypes";

export async function getReminders() {
  const response = await fetch("http://10.0.2.2:3001/reminders");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function completeReminder(id: number, isCompleted: boolean) {
  const response = await fetch(`http://10.0.2.2:3001/reminders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: isCompleted }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function createReminder(newReminder: InsertReminder) {
  const response = await fetch("http://10.0.2.2:3001/reminders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReminder),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function getReminderById(id: number) {
  const response = await fetch(`http://10.0.2.2:3001/reminders/${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function updateOldReminder(
  id: number,
  updatedReminder: UpdateReminder
) {
  const response = await fetch(`http://10.0.2.2:3001/reminders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedReminder),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}
