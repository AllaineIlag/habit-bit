'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getRandomQuote } from '@/actions/quotes'

interface QuoteData {
  text: string
  author: string | null
}

export function QuoteCard() {
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch the deterministic quote once on mount
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await getRandomQuote()
        if (data) setQuote(data)
      } catch (err) {
        console.error('Failed to fetch quote:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchQuote()
  }, [])

  return (
    <Card className="rounded-[var(--radius-lg)] border-none bg-[var(--bento-card-bg)] backdrop-blur-xl relative overflow-hidden flex items-center p-6 group min-h-[140px]">
      {/* Visual Background Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Quote className="h-24 w-24 rotate-12" />
      </div>

      <div className="space-y-4 relative z-10 w-full">
        {/* Daily Label */}
        <div className="text-[var(--text-micro)] font-bold tracking-[0.2em] text-[var(--bento-accent)] uppercase mb-2 opacity-80">
          Daily Motivation
        </div>

        <AnimatePresence mode="wait">
          {!isLoading && quote ? (
            <motion.div
              key={quote.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-1.5"
            >
              <p className="text-[var(--font-size-base)] font-medium leading-relaxed text-white/90 tracking-wide">
                "{quote.text}"
              </p>
              <p className="text-[var(--text-tiny)] text-[var(--bento-text-muted)] font-mono uppercase tracking-[0.25em] opacity-70">
                — {quote.author || 'Unknown'}
              </p>
            </motion.div>
          ) : isLoading ? (
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-[var(--bento-item-bg)] animate-pulse rounded" />
              <div className="h-3 w-1/4 bg-[var(--bento-item-bg)] animate-pulse rounded" />
            </div>
          ) : null}
        </AnimatePresence>
      </div>
    </Card>
  )
}
