'use server'

import { createServerSupabaseClient } from '@/lib/supabase'
import { startOfDay, endOfDay, subDays, format, isSameDay, startOfWeek, addDays } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

const USER_TIMEZONE = 'Asia/Shanghai' // UTC+8

export async function getDashboardSummary() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return {
      totalRituals: 0,
      completedToday: 0,
      streakCount: 0,
      completionRate: 0,
      habits: []
    }
  }

  // Get all rituals for the user
  const { data: habits, error: habitsError } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id)

  if (habitsError) throw habitsError

  // Get all logs for the user to calculate streaks and weekly heatmaps
  const { data: allLogs, error: logsError } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })

  if (logsError) throw logsError

  const now = new Date()
  const todayZoned = toZonedTime(now, USER_TIMEZONE)
  const monday = startOfWeek(todayZoned, { weekStartsOn: 1 })

  // Process each habit
  const processedHabits = (habits || []).map(habit => {
    const habitLogs = (allLogs || []).filter(log => log.habit_id === habit.id)
    const logDates = new Set(habitLogs.map(log => 
      format(toZonedTime(new Date(log.completed_at), USER_TIMEZONE), 'yyyy-MM-dd')
    ))

    // Calculate Streak
    let streak = 0
    let checkDate = todayZoned
    
    // Check today first
    const isCompletedToday = logDates.has(format(todayZoned, 'yyyy-MM-dd'))
    
    if (!isCompletedToday) {
      checkDate = subDays(todayZoned, 1)
    }

    while (logDates.has(format(checkDate, 'yyyy-MM-dd'))) {
      streak++
      checkDate = subDays(checkDate, 1)
    }

    // Calculate Weekly Completion (Mon-Sun)
    const weeklyLogs = Array.from({ length: 7 }, (_, i) => {
      const day = addDays(monday, i)
      return logDates.has(format(day, 'yyyy-MM-dd'))
    })

    return {
      ...habit,
      streak,
      weeklyLogs,
      isCompletedToday
    }
  })

  const totalRituals = habits?.length || 0
  const completedToday = processedHabits.filter(h => h.isCompletedToday).length
  
  // Overall Dashboard Streak (Consecutive days with ANY completion)
  let dashboardStreak = 0
  const overallLogDates = new Set((allLogs || []).map(log => 
    format(toZonedTime(new Date(log.completed_at), USER_TIMEZONE), 'yyyy-MM-dd')
  ))

  let dsCheckDate = todayZoned
  if (!overallLogDates.has(format(todayZoned, 'yyyy-MM-dd'))) {
    dsCheckDate = subDays(todayZoned, 1)
  }
  while (overallLogDates.has(format(dsCheckDate, 'yyyy-MM-dd'))) {
    dashboardStreak++
    dsCheckDate = subDays(dsCheckDate, 1)
  }

  return {
    totalRituals,
    completedToday,
    streakCount: dashboardStreak,
    completionRate: totalRituals > 0 ? (completedToday / totalRituals) * 100 : 0,
    habits: processedHabits
  }
}
