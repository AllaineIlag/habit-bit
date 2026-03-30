import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function IndexPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-tighter mb-4 bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
        Habit-bit
      </h1>
      <p className="text-zinc-400 max-w-md mb-8">
        Build better habits with a premium, automated tracking experience.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/auth" 
          className={cn(buttonVariants({ size: "lg" }), "bg-white text-black hover:bg-zinc-200 h-10 px-6")}
        >
          Get Started
        </Link>
        <Link 
          href="/learn-more" 
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/10 hover:bg-white/5 h-10 px-6")}
        >
          Learn More
        </Link>
      </div>
    </div>
  )
}
