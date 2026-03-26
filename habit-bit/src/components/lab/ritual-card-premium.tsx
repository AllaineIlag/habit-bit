'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface RitualCardPremiumProps {
  name: string
  streak: number
  current: number
  target: number
  weeklyCompletions?: boolean[]
  isActive?: boolean
}

export function RitualCardPremium({ 
  name, 
  streak, 
  current, 
  target, 
  weeklyCompletions = [false, false, false, false, false, false, false],
  isActive = false 
}: RitualCardPremiumProps) {
  const percentage = Math.min(Math.round((current / target) * 100), 100)
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative flex overflow-hidden rounded-4xl bg-zinc-900/40 backdrop-blur-xl border border-white/[0.03] transition-all hover:border-white/10",
        !isActive && "grayscale-[0.5] opacity-80 hover:grayscale-0 hover:opacity-100"
      )}
    >
      {/* 1. The Left Wing: Ignition Streak */}
      <div className={cn(
        "relative w-24 sm:w-28 flex flex-col items-center justify-center border-r border-white font-bold bg-gradient-to-b from-transparent to-black/20",
        isActive ? "border-orange-500/30" : "border-zinc-800"
      )}>
        {/* Ignition Glow Background */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-orange-500/10 blur-3xl"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={isActive ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Flame className={cn(
              "h-8 w-8 mb-1",
              isActive ? "text-orange-500 fill-orange-500/20" : "text-zinc-700"
            )} />
          </motion.div>
          <span className={cn(
            "text-2xl tracking-tighter",
            isActive ? "text-white" : "text-zinc-600"
          )}>{streak}</span>
          <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Streak</span>
        </div>
      </div>

      {/* 2. The Right Body: Progress & Heatmap */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-white">{name}</h3>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Daily Ritual</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-zinc-400">{current} / {target}</span>
          </div>
        </div>

        {/* Progress Bar (Premium Style) */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-zinc-800/50 rounded-full overflow-hidden relative">
            {/* Base Progress */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className={cn(
                "absolute inset-y-0 left-0 rounded-full transition-all duration-500",
                isActive ? "bg-white" : "bg-zinc-600"
              )}
            />
            {/* The "Shine Sweep" Animation */}
            {isActive && (
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
              />
            )}
          </div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-zinc-500">
            <span>Momentum</span>
            <span>{percentage}%</span>
          </div>
        </div>

        {/* Weekly Heatmap */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Intensity Track</span>
            <div className="flex space-x-1 text-[8px] text-zinc-600 font-mono">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weeklyCompletions.map((completed, i) => (
              <div 
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  completed 
                    ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]" 
                    : "bg-zinc-800/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card Glow FX */}
      {isActive && (
        <div className="absolute -inset-px rounded-4xl bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      )}
    </motion.div>
  )
}
