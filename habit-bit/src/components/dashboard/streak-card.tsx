'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StreakCardProps {
  habitName: string
  streak: number
  isCompletedToday: boolean
  rank: number
}

export function StreakCard({ habitName, streak, isCompletedToday, rank }: StreakCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col justify-between p-[var(--space-6)] rounded-[var(--radius-4xl)]',
        'border transition-all duration-500 backdrop-blur-sm',
        'min-h-[140px]',
        isCompletedToday
          ? 'bg-[var(--bento-card-bg)] border-[var(--bento-warning)]/25'
          : 'bg-[var(--bento-item-bg)] border-[var(--bento-border-glass)] opacity-50'
      )}
    >
      {/* Top row: Habit Name + Fire Icon */}
      <div className="flex items-start justify-between gap-3">
        {/* Habit Name */}
        <p
          className={cn(
            'font-bold leading-tight tracking-tight',
            'text-[var(--text-lg)]',
            isCompletedToday ? 'text-foreground' : 'text-[var(--bento-text-muted)]'
          )}
        >
          {habitName}
        </p>

        {/* Fire Icon — top right */}
        <motion.div
          animate={
            isCompletedToday
              ? { scale: [1, 1.12, 1], rotate: [-2, 2, -2] }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <Flame
            className={cn(
              'h-6 w-6 transition-colors duration-500',
              isCompletedToday
                ? 'text-[var(--bento-warning)] fill-[var(--bento-warning)]/20'
                : 'text-[var(--bento-text-muted)]'
            )}
            strokeWidth={1.5}
          />
        </motion.div>
      </div>

      {/* Bottom: Streak Count */}
      <div className="mt-[var(--space-4)]">
        <motion.span
          key={streak}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'font-black tracking-tighter leading-none',
            'text-[var(--text-4xl)]',
            isCompletedToday ? 'text-foreground' : 'text-[var(--bento-text-muted)]'
          )}
        >
          {streak}
        </motion.span>
        <p
          className={cn(
            'text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)] font-mono mt-[var(--space-1)]',
            isCompletedToday
              ? 'text-[var(--bento-warning)]'
              : 'text-[var(--bento-text-muted)]'
          )}
        >
          Day Streak
        </p>
      </div>
    </div>
  )
}
