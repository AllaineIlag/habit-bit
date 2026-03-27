'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Waves } from 'lucide-react'

export function LivingBridge() {
  // Static for now, will be dynamic with P1 streaks
  return (
    <Card className="col-span-full md:col-span-2 border-none bg-[var(--bento-card-bg)] backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bento-warning)]/5 via-transparent to-transparent" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          The Living Bridge
        </CardTitle>
        <Flame className="h-4 w-4 text-[var(--bento-warning)]" />
      </CardHeader>
      <CardContent className="relative z-10 py-6">
        <div className="flex items-center justify-between mb-8">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`h-12 w-2 rounded-full ${i < 4 ? 'bg-[var(--bento-warning)] shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-[var(--bento-item-bg)]'}`}
              />
              <span className="text-[var(--text-tiny)] text-muted-foreground font-mono">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col space-y-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tighter text-white">4 Day</span>
            <span className="text-sm text-muted-foreground italic">Current Sync</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Building continuity across your routine. Complete today to extend the bridge.
          </p>
        </div>
      </CardContent>
      
      {/* Animated subtle bridge lines */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--bento-warning)]/20 to-transparent" />
    </Card>
  )
}
