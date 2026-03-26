'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface MomentumData {
  history: { date: string, count: number, score: number }[]
  currentScore: number
  trend: number
}

export function MomentumScore({ data }: { data: MomentumData }) {
  const isUp = data.trend >= 0
  
  return (
    <Card className="col-span-full md:col-span-1 border-none bg-zinc-900/50 backdrop-blur-xl relative overflow-hidden group h-full">
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 via-transparent to-transparent" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Momentum Score
        </CardTitle>
        <Zap className="h-4 w-4 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex items-baseline space-x-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold tracking-tighter text-white"
          >
            {Math.round(data.currentScore)}
          </motion.div>
          <div className={`flex items-center text-xs ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {Math.abs(Math.round(data.trend))}%
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">Current Sync Power</p>
        
        {/* Heat Map Style Indicators (Last 14 Days) */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {data.history.map((day, i) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`h-3 w-3 rounded-[2px] cursor-help relative group/dot`}
              style={{ 
                backgroundColor: day.score > 75 
                  ? '#eab308' 
                  : day.score > 40 
                    ? '#ca8a04' 
                    : day.score > 0 
                      ? '#854d0e' 
                      : '#27272a'
              }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 text-[10px] rounded opacity-0 group-hover/dot:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none border border-white/5">
                {day.date}: {day.count} Rituals
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-[9px] text-muted-foreground mt-3 italic">14-day history view (UTC+8 sync)</p>
      </CardContent>
    </Card>
  )
}
