import { PageScaffold } from "@/components/layout/page-scaffold"
import { HabitChecklist } from "@/components/dashboard/habit-checklist"
import { CreateHabitDialog } from "@/components/habits/create-habit-dialog"
import { getDashboardSummary } from "@/actions/dashboard"
import { StreakCard } from "@/components/dashboard/streak-card"
import { QuoteCard } from "@/components/dashboard/daily-motivation"

export default async function DashboardPage() {
  const { habits } = await getDashboardSummary()

  // Sort habits by streak descending for the Top 3 view
  // Only habits with a 7+ day streak qualify for the Top Streak cards
  const qualifiedHabits = [...habits]
    .filter(h => h.streak >= 7)
    .sort((a, b) => b.streak - a.streak)

  // Always render exactly 3 slots; unqualified slots show an empty state
  const topStreakHabits = [
    qualifiedHabits[0] || null,
    qualifiedHabits[1] || null,
    qualifiedHabits[2] || null,
  ]

  return (
    <PageScaffold
      title="Overview"
      mainClassName="flex flex-col"
      actions={<CreateHabitDialog />}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start flex-1">


        {/* Right Content Area: Top Streaks + Future Analytics */}
        <div className="flex-1 flex flex-col gap-8 min-h-0">
          {/* Daily Motivation at the Top */}
          <QuoteCard />

          {/* Top 3 Streaks Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {topStreakHabits.map((habit, index) => (
              <StreakCard
                key={habit?.id || `empty-${index}`}
                habitName={habit?.name || ""}
                streak={habit?.streak || 0}
                isCompletedToday={habit?.isCompletedToday || false}
                rank={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar: Daily Rituals */}
        <div className="w-full md:w-3/12 min-w-[320px] self-start sticky top-6 flex flex-col" style={{ height: 'calc(100vh - 4rem - 3rem)' }}>
          <HabitChecklist habits={habits} />
        </div>
      </div>
    </PageScaffold>
  )
}
