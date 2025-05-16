export type Reminder = {
  id: string;
  reminder: string;
  notes: string | null;
  completed: boolean;
  user_id: number;
  created_at: string;
};
export type ReminderListItemProps = {
  reminderItem: Reminder;
};

export type InsertReminder = {
  reminder: string;
  notes?: string | null;
  userId: number;
};

export type UpdateReminder = {
  reminder?: string;
  notes?: string | null;
};
