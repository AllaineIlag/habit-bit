import { PageScaffold } from "@/components/layout/page-scaffold"
import { getHabits, getRecentLogs } from "@/actions/habits"
import { HabitCard } from "@/components/habits/habit-card"
import { CreateHabitDialog } from "@/components/habits/create-habit-dialog"
import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { getZonedToday } from "@/lib/date-utils"

export default async function HabitsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  const habits = await getHabits()
  const today = getZonedToday()
  const recentLogs = await getRecentLogs(140) // 140 days (7 rows x 20 columns) for the dense activity grid
  
  const completedHabitIds = new Set(
    recentLogs
      .filter(log => log.completed_at === today)
      .map(log => log.habit_id)
  )

  return (
    <PageScaffold 
      title="Habits"
      actions={<CreateHabitDialog />}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            Consistency is the bridge between goals and accomplishment.
          </p>
        </div>

        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl border-[var(--border)] bg-muted/5 opacity-60">
            <p className="text-sm font-medium text-muted-foreground">No habits created yet.</p>
            <p className="text-xs text-muted-foreground">Click "New Habit" to start your journey.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {habits.map((habit) => (
              <HabitCard 
                key={habit.id} 
                habit={habit} 
                isCompletedToday={completedHabitIds.has(habit.id)}
                activityLogs={recentLogs.filter(l => l.habit_id === habit.id)}
              />
            ))}
          </div>
        )}
      </div>
    </PageScaffold>
  )
}
