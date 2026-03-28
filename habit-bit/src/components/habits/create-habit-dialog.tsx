"use client"

import * as React from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createHabit, getRoutines, type Routine } from "@/actions/habits"
import { useState, useTransition, useEffect } from "react"
import { PlusIcon, Loader2Icon } from "lucide-react"

const DAYS_OF_WEEK = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
]

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function CreateHabitDialog() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState("")
  
  // Frequency State
  const [frequencyType, setFrequencyType] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily")
  const [weeklyDays, setWeeklyDays] = useState<number[]>([1, 2, 3, 4, 5]) // Default Mon-Fri
  const [monthlyDay, setMonthlyDay] = useState<number>(1)
  const [yearlyMonth, setYearlyMonth] = useState<number>(0)
  const [yearlyDay, setYearlyDay] = useState<number>(1)

  // Routine State
  const [routines, setRoutines] = useState<Routine[]>([])
  const [routineId, setRoutineId] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const data = await getRoutines()
        setRoutines(data)
      } catch (err) {
        console.error("Failed to fetch routines:", err)
      }
    }
    fetchRoutines()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        let frequency: any = { type: frequencyType }
        
        if (frequencyType === "weekly") {
          frequency.days = weeklyDays
        } else if (frequencyType === "monthly") {
          frequency.day = monthlyDay
        } else if (frequencyType === "yearly") {
          frequency.month = yearlyMonth
          frequency.day = yearlyDay
        }

        await createHabit({
          name,
          category: "General",
          frequency,
          routine_id: routineId
        })
        setOpen(false)
        setName("")
        setFrequencyType("daily")
        setRoutineId(null)
      } catch (error) {
        console.error("Failed to create habit:", error)
      }
    })
  }

  const toggleDay = (day: number) => {
    setWeeklyDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }), "gap-2 ")}>
        <PlusIcon className="h-4 w-4" />
        <span>New Habit</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Habit</DialogTitle>
            <DialogDescription>
              Start building a better version of yourself today.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input
                id="name"
                placeholder="e.g., Daily Meditation"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Frequency</Label>
              <Select value={frequencyType} onValueChange={(v) => v && setFrequencyType(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Routine (Time of Day)</Label>
              <Select value={routineId || "none"} onValueChange={(v) => setRoutineId(v === "none" ? null : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a routine (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None / Flexible</SelectItem>
                  {routines.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {frequencyType === "weekly" && (
              <div className="grid gap-3">
                <Label>Repeat on</Label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day.value} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md">
                      <Checkbox 
                        id={`day-${day.value}`}
                        checked={weeklyDays.includes(day.value)}
                        onCheckedChange={() => toggleDay(day.value)}
                      />
                      <label htmlFor={`day-${day.value}`} className="text-sm font-medium leading-none cursor-pointer">
                        {day.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {frequencyType === "monthly" && (
              <div className="grid gap-2">
                <Label htmlFor="monthly-day">Day of Month</Label>
                <Input
                  id="monthly-day"
                  type="number"
                  min={1}
                  max={31}
                  value={monthlyDay}
                  onChange={(e) => setMonthlyDay(parseInt(e.target.value))}
                />
              </div>
            )}

            {frequencyType === "yearly" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Month</Label>
                  <Select value={yearlyMonth.toString()} onValueChange={(v) => v && setYearlyMonth(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((month, i) => (
                        <SelectItem key={month} value={i.toString()}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Day</Label>
                  <Input
                    type="number"
                    min={1}
                    max={31}
                    value={yearlyDay}
                    onChange={(e) => setYearlyDay(parseInt(e.target.value))}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending || !name}>
              {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Create Habit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
