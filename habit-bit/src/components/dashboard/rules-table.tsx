'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Shield, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Rule {
  id: string
  title: string
  description: string | null
  category: string | null
}

interface RulesTableProps {
  rules: Rule[]
}

export function RulesTable({ rules }: RulesTableProps) {
  return (
    <Card className="border-none bg-[var(--bento-card-bg)] backdrop-blur-xl relative overflow-hidden group h-full flex flex-col min-h-[500px]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bento-warning)]/5 via-transparent to-transparent opacity-50" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-4 relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[var(--bento-warning)]/10 border border-[var(--bento-warning)]/20">
            <Shield className="h-4 w-4 text-[var(--bento-warning)]" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-white">Rules</CardTitle>
        </div>
        <div className="p-1 rounded-full bg-[var(--bento-warning)]/10">
          <Sparkles className="h-3 w-3 text-[var(--bento-warning)] opacity-50" />
        </div>
      </CardHeader>

      <CardContent className="p-0 relative z-10 flex-1 min-h-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="space-y-4">
            {rules.length === 0 ? (
              <div className="py-8 text-center text-[var(--bento-text-muted)] font-medium tracking-tight">
                No rules established yet.
              </div>
            ) : (
              <div className="grid gap-4">
                {rules.map((rule, index) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "group/item relative p-4 rounded-2xl transition-all duration-300 border border-[var(--bento-border-glass)] bg-[var(--bento-item-bg)] hover:bg-[var(--bento-item-hover)] hover:border-[var(--bento-highlight)]"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white tracking-tight">{rule.title}</h4>
                        {rule.category && (
                          <span className="text-[var(--text-tiny)] uppercase tracking-wider text-[var(--bento-warning)]/70 font-bold px-2 py-0.5 rounded-full bg-[var(--bento-warning)]/5 border border-[var(--bento-warning)]/10">
                            {rule.category}
                          </span>
                        )}
                      </div>
                      {rule.description && (
                        <p className="text-xs text-[var(--bento-text-muted)] leading-relaxed line-clamp-2 italic">
                          "{rule.description}"
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
