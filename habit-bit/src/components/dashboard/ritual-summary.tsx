'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CheckCircle2, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface RitualSummaryProps {
  total: number
  completed: number
  rate: number
}

export function RitualSummary({ total, completed, rate }: RitualSummaryProps) {
  return (
    <Card className="col-span-full md:col-span-1 border-none bg-[var(--bento-card-bg)] backdrop-blur-xl group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bento-info)]/10 via-transparent to-[var(--bento-extra)]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <Badge variant="outline" className="text-[var(--text-tiny)] uppercase font-mono bg-[var(--bento-item-bg)] border-[var(--bento-border-glass)] text-[var(--bento-text-muted)] group-hover/item:text-white transition-colors">
          Daily Momentum
        </Badge>
        <Activity className="h-4 w-4 text-[var(--bento-info)] animate-pulse" />
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
          <div 
            className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bento-item-hover)] transition-colors border border-transparent hover:border-[var(--bento-highlight)] group/item"
          >
            <span className="text-muted-foreground">Focus Score</span>
            <span className="text-sm text-white/70 font-medium truncate max-w-[120px]">{rate.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--bento-item-bg)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${rate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[var(--bento-info)] to-[var(--bento-accent)] shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
