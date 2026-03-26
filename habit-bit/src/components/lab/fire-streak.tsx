'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Flame, Power } from 'lucide-react'

interface FireStreakProps {
  isActive: boolean
  count: number
}

export function FireStreak({ isActive: propActive, count }: FireStreakProps) {
  const [internalActive, setInternalActive] = useState(propActive)

  // Sync with props but allow manual override
  useEffect(() => {
    setInternalActive(propActive)
  }, [propActive])

  return (
    <div className="relative group w-full max-w-[320px]">
      {/* Manual Toggle (Audit Mode) */}
      <div className="absolute top-4 right-4 z-30">
        <button 
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setInternalActive(!internalActive)
          }}
          className={`
            relative h-5 w-9 rounded-full transition-colors duration-300 flex items-center px-0.5
            ${internalActive ? 'bg-orange-500' : 'bg-zinc-700'}
          `}
        >
          <motion.div 
            animate={{ x: internalActive ? 16 : 0 }}
            className="h-4 w-4 bg-white rounded-full shadow-lg"
          />
        </button>
      </div>

      {/* Background Glow */}
      <AnimatePresence>
        {internalActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"
          />
        )}
      </AnimatePresence>

      <div className={`
        relative flex flex-col items-center justify-center p-8 rounded-3xl 
        border transition-all duration-700
        ${internalActive 
          ? 'bg-zinc-900/40 border-orange-500/30' 
          : 'bg-zinc-900/20 border-white/[0.03] grayscale opacity-50'}
      `}>
        {/* The Fire Icon */}
        <div className="relative mb-4">
          <motion.div
            animate={internalActive ? {
              scale: [1, 1.1, 1],
              rotate: [-1, 1, -1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <Flame 
              className={`h-24 w-24 transition-colors duration-700 ${internalActive ? 'text-orange-500 fill-orange-500/20' : 'text-zinc-600'}`} 
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Inner Content (The Piece/Pawn Concept) */}
          <div className="absolute inset-0 flex items-center justify-center pt-4">
             <motion.div
                animate={internalActive ? {
                  y: [0, -2, 0],
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
             >
                <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors duration-700 ${internalActive ? 'border-orange-400 bg-orange-500/10' : 'border-zinc-700 bg-zinc-800'}`}>
                   <div className={`h-4 w-4 bg-current rounded-full transition-colors duration-700 ${internalActive ? 'text-orange-300' : 'text-zinc-600'}`} />
                </div>
             </motion.div>
          </div>

          {/* Flickering Sparks (Only when active) */}
          {internalActive && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ 
                    y: -40 - Math.random() * 40, 
                    x: (Math.random() - 0.5) * 40,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute bottom-4 left-1/2 h-1 w-1 bg-orange-400 rounded-full blur-[1px]"
                />
              ))}
            </>
          )}
        </div>

        {/* Streak Info */}
        <div className="text-center relative z-10">
          <motion.div
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-5xl font-black tracking-tighter transition-colors duration-700 ${internalActive ? 'text-white' : 'text-zinc-500'}`}
          >
            {count}
          </motion.div>
          <div className={`text-xs uppercase tracking-[0.2em] font-mono transition-colors duration-700 ${internalActive ? 'text-orange-500' : 'text-zinc-600'}`}>
            Day Streak
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-6">
          <div className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all duration-700 ${internalActive ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
            {internalActive ? 'Ignited' : 'Dormant'}
          </div>
        </div>
      </div>
    </div>
  )
}
