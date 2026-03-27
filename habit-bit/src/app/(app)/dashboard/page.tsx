import { PageScaffold } from "@/components/layout/page-scaffold"
import { HabitChecklist } from "@/components/dashboard/habit-checklist"
import { RulesTable } from "@/components/dashboard/rules-table"
import { getDashboardSummary } from "@/actions/dashboard"
import { getRules } from "@/actions/rules"

export default async function DashboardPage() {
  const { habits } = await getDashboardSummary()
  const rules = await getRules()

  return (
    <PageScaffold title="Overview">
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* Left: Daily Rituals (1/4) */}
        <div className="w-full md:w-1/4 min-w-[320px] flex flex-col min-h-[500px]">
          <HabitChecklist habits={habits} />
        </div>
        
        {/* Middle: Content Area (1/2) */}
        <div className="hidden md:block md:w-1/2" />
        
        {/* Right: Rules (1/4) */}
        <div className="w-full md:w-1/4 min-w-[320px]">
          <RulesTable rules={rules} />
        </div>
      </div>
    </PageScaffold>
  )
}
