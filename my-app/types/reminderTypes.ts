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
