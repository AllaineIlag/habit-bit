'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CheckCircle2, Target } from 'lucide-react'

interface RitualSummaryProps {
  total: number
  completed: number
  rate: number
}

export function RitualSummary({ total, completed, rate }: RitualSummaryProps) {
  return (
    <Card className="overflow-hidden border-none bg-grid-white/[0.02] bg-zinc-900/50 backdrop-blur-xl relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest font-sans">
          Daily Momentum
        </CardTitle>
        <Activity className="h-4 w-4 text-blue-400 animate-pulse" />
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex items-baseline space-x-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tighter text-white"
          >
            {completed}/{total}
          </motion.div>
          <span className="text-xs text-muted-foreground">Rituals Met</span>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Focus Score</span>
            <span className="text-blue-400 font-mono">{rate.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${rate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
