'use client'

import { useState, useTransition, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getRandomQuote } from '@/actions/quotes'
import { Button } from '@/components/ui/button'

interface QuoteData {
  text: string
  author: string | null
}

export function QuoteCard() {
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [isPending, startTransition] = useTransition()

  const fetchQuote = () => {
    startTransition(async () => {
      try {
        const data = await getRandomQuote()
        if (data) setQuote(data)
      } catch (err) {
        console.error('Failed to fetch quote:', err)
      }
    })
  }

  // Initial fetch
  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <Card className="col-span-full border-none bg-zinc-900/50 backdrop-blur-xl relative overflow-hidden flex items-center p-6 group min-h-[140px]">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Quote className="h-24 w-24 rotate-12" />
      </div>
      
      <div className="space-y-4 relative z-10 w-full pr-12">
        <AnimatePresence mode="wait">
          {quote ? (
            <motion.div
              key={quote.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <p className="text-lg font-medium leading-tight text-white/90 italic tracking-tight">
                "{quote.text}"
              </p>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">— {quote.author || 'Unknown'}</p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-zinc-800 animate-pulse rounded" />
              <div className="h-3 w-1/4 bg-zinc-800 animate-pulse rounded" />
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={fetchQuote}
          className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all border border-white/5"
        >
          <RotateCcw className={`h-4 w-4 ${isPending ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
        </Button>
      </div>
    </Card>
  )
}
