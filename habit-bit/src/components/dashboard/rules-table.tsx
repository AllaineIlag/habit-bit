'use client'

import { useState, useTransition, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toggleRuleLog } from '@/actions/rules'
import { cn } from '@/lib/utils'
import { CheckCircle2, ShieldCheck } from 'lucide-react'

interface Rule {
  id: string
  title: string
  isCompletedToday: boolean
}

interface RulesTableProps {
  rules: Rule[]
}

export function RulesTable({ rules: initialRules }: RulesTableProps) {
  const [rules, setRules] = useState(initialRules)
  const [isPending, startTransition] = useTransition()

  const handleToggle = async (ruleId: string, currentState: boolean) => {
    // Optimistic Update
    setRules(prev => prev.map(r =>
      r.id === ruleId ? { ...r, isCompletedToday: !currentState } : r
    ))

    startTransition(async () => {
      try {
        await toggleRuleLog(ruleId)
      } catch (error) {
        // Rollback on error
        setRules(prev => prev.map(r =>
          r.id === ruleId ? { ...r, isCompletedToday: currentState } : r
        ))
        console.error('Failed to toggle rule:', error)
      }
    })
  }

  return (
    <Card className="border-none rounded-[var(--radius-lg)] bg-[var(--bento-card-bg)] backdrop-blur-xl relative overflow-hidden group h-full flex flex-col gap-0 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bento-warning)]/5 via-transparent to-transparent opacity-50" />

      <CardHeader className="flex flex-row items-center justify-between pb-4 relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[var(--bento-warning)]/10 border border-[var(--bento-warning)]/20">
            <ShieldCheck className="h-4 w-4 text-[var(--foreground)]" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-white">Rules</CardTitle>
        </div>
        <div className="text-[var(--text-tiny)] uppercase tracking-widest text-[var(--bento-text-muted)] font-bold bg-[var(--bento-item-bg)] px-2 py-1 rounded-md">
          {rules.filter(r => r.isCompletedToday).length} / {rules.length}
        </div>
      </CardHeader>

      <CardContent className="p-0 relative z-10 flex-1 flex flex-col min-h-0">
        <ScrollArea className="h-[100%] absolute inset-0 px-6 pb-6">
          <motion.div className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {rules.map((rule) => (
                <motion.div
                  key={rule.id}
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
                    rule.isCompletedToday
                      ? "bg-[var(--bento-item-bg)] border-[var(--bento-highlight)]/30"
                      : "bg-[var(--bento-item-bg)] hover:bg-[var(--bento-item-hover)] hover:border-[var(--bento-highlight)]"
                  )}
                >
                  <div className="relative flex items-center justify-center shrink-0 ml-1">
                    <Checkbox
                      id={rule.id}
                      checked={rule.isCompletedToday}
                      onCheckedChange={() => handleToggle(rule.id, rule.isCompletedToday)}
                      className={cn(
                        "h-5 w-5 rounded-md transition-all duration-500",
                        rule.isCompletedToday
                          ? "bg-[var(--bento-accent)] border-[var(--bento-accent)] text-white"
                          : "border-[var(--bento-border-glass)] bg-[var(--bento-card-bg)]"
                      )}
                    />
                    {rule.isCompletedToday && (
                      <motion.div
                        layoutId={`rule-glow-${rule.id}`}
                        className="absolute inset-0 bg-[var(--bento-accent-subtle)] blur-md rounded-full -z-10"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 relative">
                    <label
                      htmlFor={rule.id}
                      className={cn(
                        "text-sm font-normal tracking-tight cursor-pointer select-none transition-all duration-500 flex items-center",
                        rule.isCompletedToday ? "text-[var(--bento-text-muted)]" : "text-white"
                      )}
                    >
                      <span className="relative">
                        {rule.title}
                        {rule.isCompletedToday && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className="absolute left-0 top-1/2 h-[1px] bg-[var(--bento-text-muted)]/30"
                          />
                        )}
                      </span>
                    </label>
                  </div>

                  {rule.isCompletedToday && (
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
      </CardContent>
    </Card>
  )
}
