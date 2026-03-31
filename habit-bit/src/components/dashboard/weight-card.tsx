'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { logWeight } from '@/actions/health'
import { Scale, ChevronRight, Loader2, Target } from 'lucide-react'
import { toast } from 'sonner'

interface WeightCardProps {
  initialWeight: number | null
}

export function WeightCard({ initialWeight }: WeightCardProps) {
  const [weight, setWeight] = useState<string>(initialWeight?.toString() || '')
  const [isPending, startTransition] = useTransition()
  const [latestWeight, setLatestWeight] = useState<number | null>(initialWeight)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const weightNum = parseInt(weight)
    
    if (isNaN(weightNum) || weightNum <= 0) {
      toast.error("Please enter a valid weight")
      return
    }

    startTransition(async () => {
      try {
        await logWeight(weightNum)
        setLatestWeight(weightNum)
        toast.success("Weight logged and ritual updated!")
      } catch (error) {
        toast.error("Failed to log weight")
        console.error(error)
      }
    })
  }

  return (
    <Card className="relative overflow-hidden rounded-[var(--radius-lg)] border bg-card/50 backdrop-blur-md shadow-xl transition-all hover:shadow-2xl hover:bg-card/60 group">
      {/* Background Gradient Detail */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl transition-all group-hover:bg-primary/20" />
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-bold flex items-center gap-2 tracking-tight">
              <Scale className="h-5 w-5 text-primary" />
              Weight Tracker
            </CardTitle>
          </div>
          {latestWeight && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-end"
            >
              <span className="text-2xl font-black tracking-tighter text-primary leading-none">
                {latestWeight}
                <span className="text-xs ml-1 font-bold text-muted-foreground">kg</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/50 mt-1">Latest Entry</span>
            </motion.div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1 group/input">
            <Input
              type="number"
              placeholder="00"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              disabled={isPending}
              className="bg-muted/30 border-transparent focus:bg-background h-11 text-lg font-bold rounded-xl pl-4 pr-12 transition-all placeholder:text-muted-foreground/30 focus-visible:ring-primary/20"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className="text-xs font-black text-muted-foreground/30 group-focus-within/input:text-primary/50 transition-colors">kg</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isPending || !weight}
            className="h-11 px-4 rounded-xl aspect-square sm:aspect-auto sm:px-6 font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">Log Entry</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
