"use client"

import { useState } from "react"
import { signIn } from "@/actions/auth"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AuthPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    setError(null)
    
    // We expect signIn to redirect on success.
    // If it returns an object with an error, we display it.
    const result = await signIn(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsPending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Premium ambient background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-zinc-950/80 backdrop-blur-xl border-zinc-800/50 shadow-2xl shadow-black/50 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-amber-500/5 pointer-events-none" />
          
          <CardHeader className="space-y-1 relative z-10 text-center pb-8 border-b border-white/5 pt-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Welcome back
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardDescription className="text-zinc-500 text-base mt-2">
                Enter your credentials to access your dashboard
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <CardContent className="pt-8 pb-10 px-8 relative z-10">
            <form action={handleSubmit} className="space-y-6">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Label htmlFor="email" className="text-zinc-400 font-medium">Email Address</Label>
                <div className="relative group">
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 h-12 px-4 transition-all duration-300"
                    placeholder="name@example.com"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-amber-500/0 group-focus-within:from-indigo-500/10 group-focus-within:to-amber-500/10 pointer-events-none transition-all duration-500" />
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-400 font-medium">Password</Label>
                </div>
                <div className="relative group">
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    autoComplete="current-password" 
                    required 
                    className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 h-12 px-4 transition-all duration-300"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-amber-500/0 group-focus-within:from-indigo-500/10 group-focus-within:to-amber-500/10 pointer-events-none transition-all duration-500" />
                </div>
              </motion.div>
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-sm font-medium text-red-400 bg-red-950/30 p-4 rounded-lg border border-red-900/50 backdrop-blur-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2"
              >
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 h-12 font-medium text-base shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]" 
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-zinc-500" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
