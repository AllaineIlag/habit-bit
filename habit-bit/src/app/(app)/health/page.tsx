import { PageScaffold } from "@/components/layout/page-scaffold"
import { WeightCard } from "@/components/dashboard/weight-card"
import { WeightChart } from "@/components/health/weight-chart"
import { getLatestWeight } from "@/actions/health"

export default async function HealthPage() {
  const latestWeight = await getLatestWeight()

  return (
    <PageScaffold title="Health">
      <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-6">
        {/* Weight Tracker Logger */}
        <div className="md:col-span-2 lg:col-span-2">
          <WeightCard initialWeight={latestWeight} />
        </div>

        {/* Weight Progress Chart */}
        <div className="md:col-span-4 lg:col-span-4">
          <WeightChart />
        </div>
      </div>
    </PageScaffold>
  )
}
