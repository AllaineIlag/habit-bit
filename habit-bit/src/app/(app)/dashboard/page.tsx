import { PageScaffold } from "@/components/layout/page-scaffold"
import { HabitChecklist } from "@/components/dashboard/habit-checklist"
import { HabitDialog } from "@/components/habits/habit-dialog"
import { getDashboardSummary } from "@/actions/dashboard"
import { StreakCard } from "@/components/dashboard/streak-card"
import { QuoteCard } from "@/components/dashboard/daily-motivation"
import { RulesTable } from "@/components/dashboard/rules-table"
import { getLatestWeight } from "@/actions/health"
import { WeightCard } from "@/components/dashboard/weight-card"

export default async function DashboardPage() {
  const [{ habits, routines, rules }, latestWeight] = await Promise.all([
    getDashboardSummary(),
    getLatestWeight()
  ])

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
      actions={<HabitDialog />}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start flex-1">


        {/* Right Content Area: Top Streaks + Future Analytics */}
        <div className="flex-1 flex flex-col gap-8 min-h-0">
          {/* Daily Motivation & Health Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <QuoteCard />
            </div>
            <div className="lg:col-span-2">
              <WeightCard initialWeight={latestWeight} />
            </div>
          </div>

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

        {/* Right Sidebar: Daily Rituals & Rules */}
        <div className="w-full md:w-3/12 min-w-[320px] self-start sticky top-6 flex flex-col gap-6" style={{ height: 'calc(100vh - 4rem - 3rem)' }}>
          <div className="flex-[3] min-h-0">
            <HabitChecklist habits={habits} routines={routines} />
          </div>
          <div className="flex-[2] min-h-0">
            <RulesTable rules={rules || []} />
          </div>
        </div>
      </div>
    </PageScaffold>
  )
}
