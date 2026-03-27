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
    <Card className="col-span-full md:col-span-1 border-none bg-[var(--bento-card-bg)] backdrop-blur-xl group h-full">
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
              className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bento-item-hover)] transition-colors border border-transparent hover:border-[var(--bento-highlight)] group/item"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="h-2 w-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" 
                  style={{ backgroundColor: habit.color_hex || '#3b82f6' }}
                />
                <span className="text-sm text-white font-medium truncate max-w-[120px]">
                  {habit.name}
                </span>
              </div>
              <Badge variant="outline" className="text-[var(--text-tiny)] uppercase font-mono bg-[var(--bento-item-bg)] border-[var(--bento-border-glass)] text-[var(--bento-text-muted)] group-hover/item:text-white transition-colors">
                {habit.category}
              </Badge>
            </motion.div>
          ))}
          {habits.length > 5 && (
            <p className="text-[var(--text-tiny)] text-center text-muted-foreground pt-2 italic">
              + {habits.length - 5} more rituals in your current sync
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
