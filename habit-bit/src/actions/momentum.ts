'use server'

import { createServerSupabaseClient } from '@/lib/supabase'
import { startOfDay, endOfDay, subDays, format, addHours, startOfToday } from 'date-fns'
import { toZonedTime, format as formatTZ } from 'date-fns-tz'

const USER_TIMEZONE = 'Asia/Shanghai' // UTC+8

export async function getMomentumData() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  // We want the last 14 days in UTC+8
  const today = toZonedTime(new Date(), USER_TIMEZONE)
  const fourteenDaysAgo = subDays(today, 14)

  const { data: logs, error } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('user_id', user.id)
    .gte('completed_at', fourteenDaysAgo.toISOString())
    .order('completed_at', { ascending: true })

  if (error) throw error

  // Process logs into a heatmap-like structure
  // We'll create a map for each day
  const dailyData: Record<string, number> = {}
  
  // Initialize with 0 for all 14 days
  for (let i = 0; i <= 14; i++) {
    const d = subDays(today, i)
    const key = format(d, 'yyyy-MM-dd')
    dailyData[key] = 0
  }

  // Count completions per day (adjusting for UTC+8)
  logs?.forEach(log => {
    const logDate = toZonedTime(new Date(log.completed_at), USER_TIMEZONE)
    const key = format(logDate, 'yyyy-MM-dd')
    if (dailyData[key] !== undefined) {
      dailyData[key]++
    }
  })

  // Get total habits to calculate relative score
  const { count: totalHabits } = await supabase
    .from('habits')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const habitsCount = totalHabits || 1

  const history = Object.entries(dailyData).map(([date, count]) => ({
    date,
    count,
    score: (count / habitsCount) * 100
  })).sort((a, b) => a.date.localeCompare(b.date))

  // Calculate current momentum trend
  const last7DaysCount = history.slice(-7).reduce((acc, d) => acc + d.count, 0)
  const prev7DaysCount = history.slice(-14, -7).reduce((acc, d) => acc + d.count, 0)
  
  const trend = prev7DaysCount > 0 ? ((last7DaysCount - prev7DaysCount) / prev7DaysCount) * 100 : 0

  return {
    history,
    currentScore: history[history.length - 1].score,
    trend
  }
}
