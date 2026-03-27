'use server';

import { createServerSupabaseClient } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import { revalidatePath } from 'next/cache';

export type Rule = Database['public']['Tables']['rules']['Row'];
export type RuleInsert = Database['public']['Tables']['rules']['Insert'];
export type RuleUpdate = Database['public']['Tables']['rules']['Update'];

export async function getRules() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('rules')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as Rule[];
}

/**
 * Create a new rule.
 */
export async function createRule(rule: Omit<RuleInsert, 'user_id'>) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from('rules')
    .insert({ ...rule, user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  
  revalidatePath('/dashboard');
  
  return data as Rule;
}

/**
 * Update an existing rule.
 */
export async function updateRule(id: string, updates: RuleUpdate) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from('rules')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  
  revalidatePath('/dashboard');
  
  return data as Rule;
}

/**
 * Delete a rule.
 */
export async function deleteRule(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from('rules')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
  
  revalidatePath('/dashboard');
}
