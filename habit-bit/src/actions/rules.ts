'use server';

import { createServerSupabaseClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { SYSTEM_TIMEZONE } from '@/config/timeline';

/**
 * Toggle rule compliance log for a specific date (defaults to today).
 */
export async function toggleRuleLog(ruleId: string, date?: string) {
  const logDate = date || format(toZonedTime(new Date(), SYSTEM_TIMEZONE), 'yyyy-MM-dd');
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Check if log exists
  const { data: existingLog } = await supabase
    .from('rule_logs')
    .select('*')
    .eq('rule_id', ruleId)
    .eq('completed_at', logDate)
    .single();

  if (existingLog) {
    // Delete if exists (toggle off)
    const { error } = await supabase
      .from('rule_logs')
      .delete()
      .eq('id', existingLog.id);
    
    if (error) throw error;
  } else {
    // Insert if not exists (toggle on)
    const { error } = await supabase
      .from('rule_logs')
      .insert({
        rule_id: ruleId,
        user_id: user.id,
        completed_at: logDate
      });
    
    if (error) throw error;
  }

  revalidatePath('/dashboard');
}
