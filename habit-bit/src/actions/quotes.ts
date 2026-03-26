'use server'

import { createServerSupabaseClient } from '@/lib/supabase'

export async function getRandomQuote() {
  const supabase = await createServerSupabaseClient()
  
  // Get counts to pick a random one efficiently
  const { count, error: countError } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true })

  if (countError) throw countError
  if (!count) return null

  const randomIndex = Math.floor(Math.random() * count)

  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .range(randomIndex, randomIndex)
    .single()

  if (error) throw error
  return data
}
