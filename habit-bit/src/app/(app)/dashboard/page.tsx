import { PageScaffold } from "@/components/layout/page-scaffold"
import { HabitChecklist } from "@/components/dashboard/habit-checklist"
import { getDashboardSummary } from "@/actions/dashboard"
import { StreakCard } from "@/components/dashboard/streak-card"
import { seedTopStreaks } from "@/actions/seed"

export default async function DashboardPage() {
  const { habits } = await getDashboardSummary()

  // One-time seed for demo if no high streaks exist
  const hasHighStreaks = habits.some(h => h.streak > 4)
  if (!hasHighStreaks) {
    await seedTopStreaks()
  }

  // Sort habits by streak descending for the Top 3 view
  const topStreakHabits = [...habits]
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 3)

  return (
    <PageScaffold 
      title="Overview" 
      mainClassName="flex flex-col"
    >
      <div className="flex flex-col md:flex-row gap-6 items-start flex-1">
        {/* Left Sidebar: Daily Rituals (3/12) */}
        <div className="w-full md:w-3/12 min-w-[320px] h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] sticky top-6 flex flex-col">
          <HabitChecklist habits={habits} />
        </div>

        {/* Right Content Area: Top Streaks + Future Analytics */}
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          {/* Top 3 Streaks Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topStreakHabits.map((habit, index) => (
              <StreakCard
                key={habit.id}
                habitName={habit.name}
                streak={habit.streak}
                isCompletedToday={habit.isCompletedToday}
                rank={index + 1}
              />
            ))}
          </div>

          {/* Placeholder for future detailed analytics */}
          <div className="flex-1 rounded-3xl border border-white/[0.03] bg-zinc-900/10 flex items-center justify-center p-12 text-zinc-500/50">
             <div className="text-center">
                <div className="text-sm font-bold tracking-widest uppercase mb-2">Detailed Analytics</div>
                <div className="text-[10px] font-mono">Mission: The Living Bridge (In Progress)</div>
             </div>
          </div>
        </div>
      </div>
    </PageScaffold>
  )
}
