'use server';

import { createServerSupabaseClient } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import { revalidatePath } from 'next/cache';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { SYSTEM_TIMEZONE } from '@/config/timeline';

export type Habit = Database['public']['Tables']['habits']['Row'];
export type HabitInsert = Database['public']['Tables']['habits']['Insert'];
export type HabitUpdate = Database['public']['Tables']['habits']['Update'];
export type HabitLog = Database['public']['Tables']['habit_logs']['Row'];
export type Routine = Database['public']['Tables']['routines']['Row'];

/**
 * Fetch all habits for the authenticated user.
 */
export async function getHabits() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Habit[];
}

/**
 * Create a new habit.
 */
export async function createHabit(habit: Omit<HabitInsert, 'user_id'>) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from('habits')
    .insert({ ...habit, user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  
  revalidatePath('/habits');
  revalidatePath('/dashboard');
  
  return data as Habit;
}

/**
 * Update an existing habit.
 */
export async function updateHabit(id: string, updates: HabitUpdate) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from('habits')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  
  revalidatePath('/habits');
  revalidatePath('/dashboard');
  
  return data as Habit;
}

/**
 * Delete a habit.
 */
export async function deleteHabit(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
  
  revalidatePath('/habits');
  revalidatePath('/dashboard');
}

/**
 * Toggle habit completion log for a specific date (defaults to today).
 */
export async function toggleHabitLog(habitId: string, date?: string) {
  // If no date is provided, use the current date in the system's timezone
  const logDate = date || format(toZonedTime(new Date(), SYSTEM_TIMEZONE), 'yyyy-MM-dd');
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Check if log exists
  const { data: existingLog } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('habit_id', habitId)
    .eq('completed_at', logDate)
    .single();

  if (existingLog) {
    // Delete if exists (toggle off)
    const { error } = await supabase
      .from('habit_logs')
      .delete()
      .eq('id', existingLog.id);
    
    if (error) throw error;
  } else {
    // Insert if not exists (toggle on)
    const { error } = await supabase
      .from('habit_logs')
      .insert({
        habit_id: habitId,
        user_id: user.id,
        completed_at: logDate,
        status: 'done'
      });
    
    if (error) throw error;
  }

  revalidatePath('/habits');
  revalidatePath('/dashboard');
}

/**
 * Fetch logs for a specific range of days.
 */
export async function getRecentLogs(days: number = 7) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('user_id', user.id)
    .gte('completed_at', startDate.toISOString().split('T')[0]);

  if (error) throw error;
  return data as HabitLog[];
}

/**
 * Fetch all available routines.
 */
export async function getRoutines() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('routines')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data as Routine[];
}
