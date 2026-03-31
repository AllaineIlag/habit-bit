'use client'

import { useState, useTransition, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toggleHabitLog } from '@/actions/habits'
import { cn } from '@/lib/utils'
import { CheckCircle2, ListTodo } from 'lucide-react'

interface Routine {
  id: string
  name: string
  order_index: number
}

interface Habit {
  id: string
  name: string
  isCompletedToday: boolean
  routine_id?: string | null
}

interface HabitChecklistProps {
  habits: Habit[]
  routines: Routine[]
}

export function HabitChecklist({ habits: initialHabits, routines = [] }: HabitChecklistProps) {
  const [habits, setHabits] = useState(initialHabits)
  const [isPending, startTransition] = useTransition()
  
  // Sort routines by order_index
  const allTabs = useMemo(() => {
    return [...routines].sort((a, b) => a.order_index - b.order_index)
  }, [routines])
  
  const [activeTab, setActiveTab] = useState(allTabs[0]?.id || '')

  const activeTabHabits = useMemo(() => {
    return habits.filter(h => h.routine_id === activeTab)
  }, [habits, activeTab])

  const handleToggle = async (habitId: string, currentState: boolean) => {
    // Optimistic Update - No sorting, just toggle the state in place
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
  
  const renderHabitList = (routineId: string) => {
    const tabHabits = habits.filter(h => h.routine_id === routineId)
    
    // Within the same tab, sort incomplete habits above completed, 
    // but maintain general order or just rely on existing list order
    // We already moved away from auto-reordering so people can drag/drop on Management view.
    // However, wait—was there a feature previously to hide or move completed to bottom?
    // "No sorting, just toggle...". The UI toggles in place.
    
    if (tabHabits.length === 0) {
      return (
        <div className="py-8 text-center text-[var(--bento-text-muted)] p-6 font-medium tracking-tight">
          No rituals set.
        </div>
      )
    }

    return (
      <ScrollArea className="h-[100%] absolute inset-0 px-6 pb-6">
        <motion.div className="space-y-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {tabHabits.map((habit) => (
              <motion.div
                key={habit.id}
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
                  "flex items-center gap-3 p-3 rounded-[var(--radius-lg)] transition-colors duration-300 border border-[var(--bento-border-glass)] group/item",
                  habit.isCompletedToday
                    ? "bg-[var(--bento-item-bg)] border-[var(--bento-highlight)]/30"
                    : "bg-[var(--bento-item-bg)] hover:bg-[var(--bento-item-hover)] hover:border-[var(--bento-highlight)]"
                )}
              >
                <div className="relative flex items-center justify-center shrink-0 ml-1">
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
                      "text-sm font-normal tracking-tight cursor-pointer select-none transition-all duration-500 flex items-center",
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </ScrollArea>
    )
  }

  return (
    <Card className="border-none rounded-[var(--radius-lg)] bg-[var(--bento-card-bg)] backdrop-blur-xl relative overflow-hidden group h-full flex flex-col gap-0 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bento-accent)]/5 via-transparent to-transparent opacity-50" />

      <CardHeader className="flex flex-row items-center justify-between pb-4 relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[var(--bento-accent-subtle)] border border-[var(--bento-accent-border)]">
            <ListTodo className="h-4 w-4 text-[var(--foreground)]" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-white">Tasks</CardTitle>
        </div>
        <div className="text-[var(--text-tiny)] uppercase tracking-widest text-[var(--bento-text-muted)] font-bold bg-[var(--bento-item-bg)] px-2 py-1 rounded-md">
          {activeTabHabits.filter(h => h.isCompletedToday).length} / {activeTabHabits.length}
        </div>
      </CardHeader>

      <CardContent className="p-0 relative z-10 flex-1 flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col w-full">
          <div className="px-6 pb-4 shrink-0 w-full">
            <TabsList className="bg-[var(--bento-item-bg)] border border-[var(--bento-border-glass)] w-full flex justify-between p-1 rounded-xl h-auto shrink-0 overflow-x-auto no-scrollbar gap-1">
              {allTabs.map(tab => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex-1 min-w-0 rounded-lg text-xs font-semibold py-2 data-[state=active]:bg-[var(--bento-accent)] data-[state=active]:text-white transition-all text-[var(--bento-text-muted)] hover:text-white px-2 truncate"
                >
                  <span className="truncate">{tab.name.length > 6 && allTabs.length > 3 ? tab.name.substring(0, 3) : tab.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <div className="flex-1 relative w-full h-full min-h-0">
            {allTabs.map(tab => (
              <TabsContent 
                key={tab.id} 
                value={tab.id} 
                className="h-full m-0 data-[state=inactive]:hidden data-[state=active]:flex flex-col absolute inset-0 w-full outline-none ring-0 focus-visible:ring-0"
              >
                {renderHabitList(tab.id)}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
