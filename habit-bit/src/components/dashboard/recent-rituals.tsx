'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle } from 'lucide-react'
import { motion } from 'framer-motion'

interface Habit {
  id: string
  name: string
  category: string
  color_hex?: string
}

interface RecentRitualsProps {
  habits: Habit[]
}

export function RecentRituals({ habits }: RecentRitualsProps) {
  return (
    <Card className="col-span-full md:col-span-1 border-none bg-zinc-900/50 backdrop-blur-xl group h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Active Rituals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {habits.slice(0, 5).map((habit, i) => (
            <motion.div 
              key={habit.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05] group/item"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="h-2 w-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" 
                  style={{ backgroundColor: habit.color_hex || '#3b82f6' }}
                />
                <span className="text-sm text-zinc-300 font-medium truncate max-w-[120px]">
                  {habit.name}
                </span>
              </div>
              <Badge variant="outline" className="text-[10px] uppercase font-mono bg-zinc-800/50 border-zinc-700/50 text-zinc-500 group-hover/item:text-zinc-300 transition-colors">
                {habit.category}
              </Badge>
            </motion.div>
          ))}
          {habits.length > 5 && (
            <p className="text-[10px] text-center text-muted-foreground pt-2 italic">
              + {habits.length - 5} more rituals in your current sync
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
