import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type HabitStatusType = "productive" | "pending" | "missed" | "streak"

interface StatusBadgeProps {
  status: HabitStatusType
  className?: string
  children: React.ReactNode
}

/**
 * StatusBadge: A semantic wrapper for Badge reflecting habit-specific states.
 */
export function StatusBadge({ status, className, children }: StatusBadgeProps) {
  const statusStyles = {
    productive: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    missed: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    streak: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  }

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium tracking-wide uppercase text-[10px]",
        statusStyles[status],
        className
      )}
    >
      {children}
    </Badge>
  )
}
