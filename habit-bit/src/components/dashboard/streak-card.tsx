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
  const isIgnited = streak >= 7 && isCompletedToday
  const isMilestoneReached = streak >= 7
  const isEmpty = !habitName

  if (isEmpty) {
    return (
      <div
        className={cn(
          'relative flex flex-col justify-between p-[var(--space-6)] rounded-[var(--radius-lg)]',
          'border transition-all duration-500 backdrop-blur-sm',
          'min-h-[140px] h-full overflow-hidden',
          'bg-[var(--bento-item-bg)] border-[var(--bento-border-glass)]',
          'grayscale opacity-50'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span />
          <Flame className="h-6 w-6 shrink-0 text-[var(--bento-text-muted)]" strokeWidth={1.5} />
        </div>
        <div className="mt-[var(--space-4)]">
          <p className="text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)] font-mono text-[var(--bento-text-muted)]">
            Nothing to show yet.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex flex-col justify-between p-[var(--space-6)] rounded-[var(--radius-4xl)]',
        'border transition-all duration-500 backdrop-blur-sm group',
        'min-h-[140px] h-full overflow-hidden',
        isIgnited
          ? 'bg-[var(--bento-card-bg)] border-[var(--bento-warning)]/30 ring-1 ring-[var(--bento-warning)]/10'
          : 'bg-[var(--bento-item-bg)] border-[var(--bento-border-glass)]'
      )}
    >
      {/* Background Glow for Ignited State */}
      {isIgnited && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--bento-warning)]/5 blur-3xl -z-10 group-hover:bg-[var(--bento-warning)]/10 transition-all duration-700" />
      )}

      {/* Top row: Habit Name + Fire Icon */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex flex-col gap-1">
          <p
            className={cn(
              'font-bold leading-tight tracking-tight text-[var(--text-lg)]',
              isIgnited ? 'text-white' : 'text-[var(--bento-text-muted)]'
            )}
          >
            {habitName}
          </p>
          {!isMilestoneReached && (
            <p className="text-[var(--text-micro)] text-[var(--bento-warning)]/40 font-bold uppercase tracking-widest">
              Building... {7 - streak} left
            </p>
          )}
        </div>

        {/* Fire Icon */}
        <motion.div
          animate={
            isIgnited
              ? { scale: [1, 1.15, 1], rotate: [-4, 4, -4] }
              : isCompletedToday && isMilestoneReached
                ? { scale: [1, 1.05, 1] }
                : {}
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <Flame
            className={cn(
              'h-6 w-6 transition-all duration-700',
              isIgnited
                ? 'text-[var(--bento-warning)] fill-[var(--bento-warning)]/30 filter drop-shadow-[0_0_8px_var(--bento-warning)]'
                : isCompletedToday
                  ? 'text-[var(--bento-text-muted)] opacity-60'
                  : 'text-[var(--white)]/5'
            )}
            strokeWidth={isIgnited ? 2 : 1.2}
          />
        </motion.div>
      </div>

      {/* Bottom: Streak Count */}
      <div className="mt-[var(--space-4)] relative z-10">
        <div className="flex items-baseline gap-2">
          <motion.span
            key={streak}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'font-black tracking-tighter leading-none text-[var(--text-4xl)]',
              isIgnited ? 'text-white' : 'text-[var(--bento-text-muted)]'
            )}
          >
            {streak}
          </motion.span>
          {isMilestoneReached && !isIgnited && (
            <span className="text-[var(--text-tiny)] text-[var(--bento-warning)]/30 font-bold uppercase animate-pulse">Dormant</span>
          )}
        </div>
        <p
          className={cn(
            'text-[var(--text-micro)] uppercase tracking-[var(--tracking-widest)] font-mono mt-[var(--space-1)]',
            isIgnited
              ? 'text-[var(--bento-warning)] font-bold'
              : 'text-[var(--bento-text-muted)]/50'
          )}
        >
          Day Streak
        </p>
      </div>
    </div>
  )
}
