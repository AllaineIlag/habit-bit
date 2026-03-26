import { PageScaffold } from "@/components/layout/page-scaffold"

export default async function DashboardPage() {
  return (
    <PageScaffold title="Overview">
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="h-20 w-20 rounded-full bg-zinc-900/40 border border-dashed border-white/10 flex items-center justify-center animate-pulse">
          <div className="h-3 w-3 bg-blue-500 rounded-full blur-[2px]" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-white">Your Visual Journey</h2>
          <p className="text-sm text-zinc-500 font-medium">Preparing the next evolution of your ritual experience...</p>
        </div>
      </div>
    </PageScaffold>
  )
}
