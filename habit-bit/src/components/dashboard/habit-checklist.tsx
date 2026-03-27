'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toggleHabitLog } from '@/actions/habits'
import { cn } from '@/lib/utils'
import { CheckCircle2, ListTodo, GripVertical } from 'lucide-react'

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
  
  // Helper to keep unchecked at top, checked at bottom
  const sortHabits = (h: Habit[]) => {
    return [...h].sort((a, b) => {
      if (a.isCompletedToday === b.isCompletedToday) return 0;
      return a.isCompletedToday ? 1 : -1;
    });
  }

  const handleToggle = async (habitId: string, currentState: boolean) => {
    // Optimistic Update
    setHabits(prev => sortHabits(prev.map(h => 
      h.id === habitId ? { ...h, isCompletedToday: !currentState } : h
    )))

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

      <CardContent className="space-y-3 relative z-10 overflow-visible">
        {habits.length === 0 ? (
          <div className="py-8 text-center text-[var(--bento-text-muted)] font-medium tracking-tight">
            No rituals set for today.
          </div>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={habits} 
            onReorder={setHabits} 
            className="space-y-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {habits.map((habit) => (
                <Reorder.Item
                  key={habit.id}
                  value={habit}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30, 
                    mass: 0.8,
                    layout: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } 
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-2xl transition-colors duration-300 border border-[var(--bento-border-glass)] cursor-grab active:cursor-grabbing group/item",
                    habit.isCompletedToday 
                      ? "bg-[var(--bento-item-bg)] border-[var(--bento-highlight)]" 
                      : "bg-[var(--bento-item-bg)] hover:bg-[var(--bento-item-hover)] hover:border-[var(--bento-highlight)]"
                  )}
                >
                  <div className="flex shrink-0 items-center justify-center text-[var(--bento-text-muted)] hover:text-white transition-colors">
                    <GripVertical className="h-4 w-4 opacity-30 group-hover/item:opacity-100" />
                  </div>

                  <div className="relative flex items-center justify-center shrink-0">
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
                            className="absolute left-0 top-1/2 h-[1px] bg-[var(--bento-text-muted)]/30"
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
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
      </CardContent>
    </Card>
  )
}
