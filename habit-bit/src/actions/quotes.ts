'use server'

import { createServerSupabaseClient } from '@/lib/supabase'
import { toZonedTime } from 'date-fns-tz'
import { SYSTEM_TIMEZONE } from '@/config/timeline'

export async function getRandomQuote() {
  const supabase = await createServerSupabaseClient()
  
  // Get counts to pick a deterministic one based on the date
  const { count, error: countError } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true })

  if (countError) throw countError
  if (!count) return null

  // Calculate days since epoch for a stable "Quote of the Day"
  // Using the system timezone to ensure the quote changes at local midnight (00:00 UTC+8)
  const localDate = toZonedTime(new Date(), SYSTEM_TIMEZONE)
  const daysSinceEpoch = Math.floor(localDate.getTime() / (1000 * 60 * 60 * 24))
  const deterministicIndex = daysSinceEpoch % count

  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .range(deterministicIndex, deterministicIndex)
    .single()

  if (error) throw error
  return data
}
