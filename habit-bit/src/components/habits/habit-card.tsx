"use client"

import * as React from "react"
import { BentoCard } from "@/components/shared/bento-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { Habit, toggleHabitLog } from "@/actions/habits"
import { CheckIcon, MoreVerticalIcon, FlameIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useTransition } from "react"

interface HabitCardProps {
  habit: Habit
  isCompletedToday: boolean
}

export function HabitCard({ habit, isCompletedToday }: HabitCardProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      await toggleHabitLog(habit.id)
    })
  }

  return (
    <BentoCard 
      title={habit.name}
      className={isCompletedToday ? "border-emerald-500/30 bg-emerald-500/5" : "hover:border-primary/40"}
      icon={
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="h-8 w-8" />
            }
          >
            <MoreVerticalIcon className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    >
      <div className="flex flex-col gap-4">
        {habit.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {habit.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusBadge status={isCompletedToday ? "productive" : "pending"}>
              {isCompletedToday ? "Done" : "Pending"}
            </StatusBadge>
            {/* Placeholder for streak - will be implemented in "The Living Bridge" phase */}
            <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase tracking-tighter">
              <FlameIcon className="h-3 w-3 fill-orange-500" />
              <span>3 Day Streak</span>
            </div>
          </div>

          <Button 
            size="sm" 
            variant={isCompletedToday ? "default" : "outline"}
            className={isCompletedToday ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}
            onClick={handleToggle}
            disabled={isPending}
          >
            {isCompletedToday ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              "Check"
            )}
          </Button>
        </div>
      </div>
    </BentoCard>
  )
}
