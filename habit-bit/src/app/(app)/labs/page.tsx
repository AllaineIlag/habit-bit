'use client'

import { PageScaffold } from '@/components/layout/page-scaffold'
import { FireStreak } from "@/components/lab/fire-streak"
import { RitualCardPremium } from "@/components/lab/ritual-card-premium"
import { RitualSummary } from "@/components/dashboard/ritual-summary"
import { LivingBridge } from "@/components/dashboard/living-bridge"
import { QuoteCard } from "@/components/dashboard/daily-motivation"
import { MomentumScore } from "@/components/dashboard/momentum-score"
import { LayoutGrid } from "lucide-react"

export default function LabsPage() {
  // Static, deterministic mock data to avoid hydration mismatches
  const mockMomentum = {
    history: [
      { date: '2024-03-01', count: 2, score: 40 },
      { date: '2024-03-02', count: 3, score: 60 },
      { date: '2024-03-03', count: 1, score: 20 },
      { date: '2024-03-04', count: 5, score: 100 },
      { date: '2024-03-05', count: 4, score: 80 },
      { date: '2024-03-06', count: 2, score: 40 },
      { date: '2024-03-07', count: 4, score: 80 },
      { date: '2024-03-08', count: 3, score: 60 },
      { date: '2024-03-09', count: 1, score: 20 },
      { date: '2024-03-10', count: 0, score: 0 },
      { date: '2024-03-11', count: 4, score: 80 },
      { date: '2024-03-12', count: 5, score: 100 },
      { date: '2024-03-13', count: 3, score: 60 },
      { date: '2024-03-14', count: 4, score: 85 },
    ],
    currentScore: 84,
    trend: 12.5
  }

  return (
    <PageScaffold title="Labs Gallery">
      <div className="space-y-16 pb-20">
        {/* Section 1: Momentum & Summary */}
        <section className="space-y-8">
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-white">01. Core Momentum Cards</h2>
            <p className="text-sm text-zinc-500">The primary metrics and progress visualizations from the Dashboard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RitualSummary total={11} completed={7} rate={64} />
            <MomentumScore data={mockMomentum} />
            <LivingBridge />
          </div>
        </section>

        {/* Section 2: Engagement & Streak */}
        <section className="space-y-8">
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-white">02. Motivation & Streak Primitives</h2>
            <p className="text-sm text-zinc-500">Atomic components used for daily engagement tracking.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <FireStreak isActive={true} count={42} />
            <QuoteCard />
          </div>
        </section>

        {/* Section 3: Premium Ritual Cards */}
        <section className="space-y-8">
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-white">03. Ritual Card Variants</h2>
            <p className="text-sm text-zinc-500">The primary vehicle for daily habit tracking.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RitualCardPremium
              name="Deep Work"
              streak={45}
              current={3}
              target={4}
              weeklyCompletions={[true, true, false, true, true, false, false]}
              isActive={true}
            />
            <RitualCardPremium
              name="Daily Exercise"
              streak={12}
              current={0}
              target={1}
              weeklyCompletions={[false, true, true, false, true, false, false]}
              isActive={false}
            />
          </div>
        </section>

        {/* Design Tokens Audit Section */}
        <div className="rounded-4xl bg-gradient-to-br from-zinc-900/40 to-transparent border border-dashed border-white/10 p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayoutGrid className="h-24 w-24" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Gallery Audit Doctrine</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[11px] text-zinc-500 font-medium">
            <div className="space-y-2">
              <span className="text-white block">Visual Consistency</span>
              <p>All items must follow the `radius-4xl` and `spacing-8` mandate. Backgrounds must use `bg-zinc-900/40` with `backdrop-blur-xl`.</p>
            </div>
            <div className="space-y-2">
              <span className="text-white block">Active States</span>
              <p>Interactive elements should feature the `orange-500` glow when "ignited" (isActive=true).</p>
            </div>
            <div className="space-y-2">
              <span className="text-white block">Performance</span>
              <p>Animations are powered by Framer Motion with `layout` transitions and `AnimatePresence` for state swaps.</p>
            </div>
          </div>
        </div>
      </div>
    </PageScaffold>
  )
}
