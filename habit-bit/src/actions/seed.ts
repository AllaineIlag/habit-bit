'use server'

import { createServerSupabaseClient } from '@/lib/supabase'
import { subDays, format } from 'date-fns'
import { revalidatePath } from 'next/cache'

export async function seedTopStreaks() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized")

  const targetHabits = ['Cold Shower', 'Read book AM', 'Journal']
  
  // Find habit IDs
  const { data: habits, error: habitsError } = await supabase
    .from('habits')
    .select('id, name')
    .in('name', targetHabits)
    .eq('user_id', user.id)

  if (habitsError) throw habitsError
  if (!habits || habits.length < 3) {
    console.error("Target habits not found in database. Please ensure 'Cold Shower', 'Read book AM', and 'Journal' exist.")
    return { success: false, message: "Target habits not found" }
  }

  const habitMap = Object.fromEntries(habits.map(h => [h.name, h.id]))

  // Cleanup existing logs for these habits to avoid duplicates/conflicts during seed
  await supabase
    .from('habit_logs')
    .delete()
    .in('habit_id', Object.values(habitMap))
    .eq('user_id', user.id)

  const logsToInsert = []

  // 1. Read Book AM: 15-day streak, NOT done today (ends yesterday)
  const readBookId = habitMap['Read book AM']
  for (let i = 1; i <= 15; i++) {
    logsToInsert.push({
      habit_id: readBookId,
      user_id: user.id,
      completed_at: format(subDays(new Date(), i), 'yyyy-MM-dd'),
      status: 'done'
    })
  }

  // 2. Cold Shower: 10-day streak, DONE today
  const coldShowerId = habitMap['Cold Shower']
  for (let i = 0; i < 10; i++) {
    logsToInsert.push({
      habit_id: coldShowerId,
      user_id: user.id,
      completed_at: format(subDays(new Date(), i), 'yyyy-MM-dd'),
      status: 'done'
    })
  }

  // 3. Journal: 5-day streak, DONE today
  const journalId = habitMap['Journal']
  for (let i = 0; i < 5; i++) {
    logsToInsert.push({
      habit_id: journalId,
      user_id: user.id,
      completed_at: format(subDays(new Date(), i), 'yyyy-MM-dd'),
      status: 'done'
    })
  }

  const { error: insertError } = await supabase
    .from('habit_logs')
    .insert(logsToInsert)

  if (insertError) throw insertError

  revalidatePath('/dashboard')
  return { success: true }
}
