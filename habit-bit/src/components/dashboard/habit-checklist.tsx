'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toggleHabitLog } from '@/actions/habits'
import { cn } from '@/lib/utils'
import { CheckCircle2, ListTodo } from 'lucide-react'

interface Habit {
  id: string
  name: string
  isCompletedToday: boolean
}

interface HabitChecklistProps {
  habits: Habit[]
}

export function HabitChecklist({ habits: initialHabits }: HabitChecklistProps) {
  const [habits, setHabits] = useState(initialHabits)
  const [isPending, startTransition] = useTransition()

  const handleToggle = async (habitId: string, currentState: boolean) => {
    // Optimistic Update
    setHabits(prev => prev.map(h => 
      h.id === habitId ? { ...h, isCompletedToday: !currentState } : h
    ))

    startTransition(async () => {
      try {
        await toggleHabitLog(habitId)
      } catch (error) {
        // Rollback on error
        setHabits(prev => prev.map(h => 
          h.id === habitId ? { ...h, isCompletedToday: currentState } : h
        ))
        console.error('Failed to toggle habit:', error)
      }
    })
  }

  return (
    <Card className="border-none bg-[var(--bento-card-bg)] backdrop-blur-xl relative overflow-hidden group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bento-accent)]/5 via-transparent to-transparent opacity-50" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[var(--bento-accent-subtle)] border border-[var(--bento-accent-border)]">
            <ListTodo className="h-4 w-4 text-[var(--bento-accent)]" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-white">Daily Rituals</CardTitle>
        </div>
        <div className="text-[var(--text-tiny)] uppercase tracking-widest text-[var(--bento-text-muted)] font-bold bg-[var(--bento-item-bg)] px-2 py-1 rounded-md">
          {habits.filter(h => h.isCompletedToday).length} / {habits.length}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 relative z-10">
        <AnimatePresence mode="popLayout">
          {habits.length === 0 ? (
            <div className="py-8 text-center text-[var(--bento-text-muted)] font-medium tracking-tight">No rituals set for today.</div>
          ) : (
            habits.map((habit) => (
              <motion.div
                key={habit.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 border border-[var(--bento-border-glass)]",
                  habit.isCompletedToday 
                    ? "bg-[var(--bento-item-bg)] border-[var(--bento-highlight)]" 
                    : "bg-[var(--bento-item-bg)] hover:bg-[var(--bento-item-hover)] hover:border-[var(--bento-highlight)]"
                )}
              >
                <div className="relative flex items-center justify-center">
                  <Checkbox 
                    id={habit.id}
                    checked={habit.isCompletedToday}
                    onCheckedChange={() => handleToggle(habit.id, habit.isCompletedToday)}
                    className={cn(
                      "h-5 w-5 rounded-md transition-all duration-500",
                      habit.isCompletedToday 
                        ? "bg-[var(--bento-accent)] border-[var(--bento-accent)] text-white" 
                        : "border-[var(--bento-border-glass)] bg-[var(--bento-card-bg)]"
                    )}
                  />
                  {habit.isCompletedToday && (
                    <motion.div 
                      layoutId={`glow-${habit.id}`}
                      className="absolute inset-0 bg-[var(--bento-accent-subtle)] blur-md rounded-full -z-10"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0 relative">
                  <label
                    htmlFor={habit.id}
                    className={cn(
                      "text-base font-medium tracking-tight cursor-pointer select-none transition-all duration-500 flex items-center",
                      habit.isCompletedToday ? "text-[var(--bento-text-muted)]" : "text-white"
                    )}
                  >
                    <span className="relative">
                      {habit.name}
                      {habit.isCompletedToday && (
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          className="absolute left-0 top-1/2 h-[1px] bg-[var(--border)]"
                        />
                      )}
                    </span>
                  </label>
                </div>

                {habit.isCompletedToday && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex shrink-0"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--bento-accent)]" />
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
