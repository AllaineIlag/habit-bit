'use server';

import { createServerSupabaseClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { SYSTEM_TIMEZONE } from '@/config/timeline';

/**
 * Log user weight and automatically toggle the "Check Weight" habit.
 */
export async function logWeight(weight: number) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const today = format(toZonedTime(new Date(), SYSTEM_TIMEZONE), 'yyyy-MM-dd');

  // 1. Log weight (Upsert for the current day)
  const { error: weightError } = await supabase
    .from('health_logs')
    .upsert({
      user_id: user.id,
      weight: weight,
      logged_at: today,
    }, { onConflict: 'user_id,logged_at' });

  if (weightError) {
    console.error('Error logging weight:', weightError);
    throw weightError;
  }

  // 2. Automatically check "Check Weight" habit
  const { data: habit } = await supabase
    .from('habits')
    .select('id')
    .eq('user_id', user.id)
    .eq('name', 'Check Weight')
    .single();

  if (habit) {
    // Check if already logged for today
    const { data: existingLog } = await supabase
      .from('habit_logs')
      .select('id')
      .eq('habit_id', habit.id)
      .eq('completed_at', today)
      .single();

    if (!existingLog) {
      const { error: logError } = await supabase
        .from('habit_logs')
        .insert({
          habit_id: habit.id,
          user_id: user.id,
          completed_at: today,
          status: 'done'
        });
      
      if (logError) {
        console.error('Error auto-logging habit:', logError);
      }
    }
  }

  revalidatePath('/dashboard');
  revalidatePath('/health');
  revalidatePath('/habit');
  
  return { success: true };
}

/**
 * Fetch the most recent weight entry.
 */
export async function getLatestWeight() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('health_logs')
    .select('weight')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching latest weight:', error);
    return null;
  }
  
  return data?.weight || null;
}

/**
 * Fetch weight history for a given number of days.
 */
export async function getWeightHistory(days: number = 7) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateStr = format(toZonedTime(startDate, SYSTEM_TIMEZONE), 'yyyy-MM-dd');

  const { data, error } = await supabase
    .from('health_logs')
    .select('weight, logged_at')
    .eq('user_id', user.id)
    .gte('logged_at', startDateStr)
    .order('logged_at', { ascending: true });

  if (error) {
    console.error('Error fetching weight history:', error);
    return [];
  }

  return data.map(log => ({
    date: log.logged_at,
    weight: Number(log.weight)
  }));
}
