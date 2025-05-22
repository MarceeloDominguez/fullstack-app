export type Reminder = {
  id: string;
  reminder: string;
  notes: string | null;
  completed: boolean;
  user_id: number;
  created_at: string;
  importance: string;
};
export type ReminderListItemProps = {
  reminderItem: Reminder;
};

export type InsertReminder = {
  reminder: string;
  notes?: string | null;
  userId: number;
  importance?: string;
};

export type UpdateReminder = {
  reminder?: string;
  notes?: string | null;
  importance?: string;
};
