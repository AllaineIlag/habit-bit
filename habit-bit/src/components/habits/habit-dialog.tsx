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
import { createHabit, updateHabit, getRoutines, type Routine, type Habit } from "@/actions/habits"
import { useState, useTransition, useEffect } from "react"
import { PlusIcon, Loader2Icon } from "lucide-react"
import { toast } from "sonner"

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

interface HabitDialogProps {
  habit?: Habit
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export function HabitDialog({ habit, open: controlledOpen, onOpenChange, trigger }: HabitDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = isControlled ? onOpenChange! : setInternalOpen

  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("General")
  const [isCustomCategory, setIsCustomCategory] = useState(false)
  
  // Frequency State
  const [frequencyType, setFrequencyType] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily")
  const [weeklyDays, setWeeklyDays] = useState<number[]>([1, 2, 3, 4, 5]) // Default Mon-Fri
  const [monthlyDay, setMonthlyDay] = useState<number>(1)
  const [yearlyMonth, setYearlyMonth] = useState<number>(0)
  const [yearlyDay, setYearlyDay] = useState<number>(1)

  // Routine State
  const [routines, setRoutines] = useState<Routine[]>([])
  const [routineId, setRoutineId] = useState<string | null>(null)

  const PREDEFINED_CATEGORIES = [
    "General", "Health", "Growth", "Productivity", "Mindset", 
    "Progress", "Morning Ritual", "Evening Ritual", "Discipline", "Housekeeping"
  ]

  // Consolidate data fetching and state initialization into a single stable hook
  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        // 1. Fetch routines if not already loaded (or refresh them)
        const routineData = await getRoutines();
        if (!active) return;
        setRoutines(routineData);

        // 2. Initialize or Reset main form state
        if (habit) {
          setName(habit.name);
          setCategory(habit.category || "General");
          setIsCustomCategory(!PREDEFINED_CATEGORIES.includes(habit.category || "General"));
          
          // 3. Frequency setup
          const freq = habit.frequency as any;
          if (freq?.type) {
            setFrequencyType(freq.type);
            if (freq.type === "weekly") setWeeklyDays(freq.days || []);
            if (freq.type === "monthly") setMonthlyDay(freq.day || 1);
            if (freq.type === "yearly") {
              setYearlyMonth(freq.month || 0);
              setYearlyDay(freq.day || 1);
            }
          }

          // 4. Validate routine_id against fresh routine list
          const rawId = habit.routine_id;
          const isValid = rawId && routineData.some(r => r.id === rawId);
          setRoutineId(isValid ? rawId : null);
        } else {
          // Reset for "New Habit" mode
          setName("");
          setCategory("General");
          setIsCustomCategory(false);
          setRoutineId(null);
          setFrequencyType("daily");
          setWeeklyDays([1, 2, 3, 4, 5]);
        }
      } catch (err) {
        console.error("Failed to load dialog data:", err);
        if (active) setRoutineId(null);
      }
    };

    if (open) {
      loadData();
    }

    return () => { active = false; };
  }, [habit?.id, open]);

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

        const validRoutineId = (routineId && routines.some(r => r.id === routineId)) ? routineId : null

        if (habit) {
          await updateHabit(habit.id, {
            name,
            category,
            frequency,
            routine_id: validRoutineId
          })
          toast.success("Habit updated successfully")
        } else {
          await createHabit({
            name,
            category,
            frequency,
            routine_id: validRoutineId
          })
          toast.success("Habit created successfully")
        }
        
        setOpen(false)
        if (!habit) {
          setName("")
          setCategory("General")
          setIsCustomCategory(false)
          setFrequencyType("daily")
          setRoutineId(null)
        }
      } catch (error) {
        console.error("Failed to save habit:", error)
        toast.error(habit ? "Failed to update habit" : "Failed to create habit")
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
      {trigger ? (
        <DialogTrigger>{trigger}</DialogTrigger>
      ) : !isControlled ? (
        <DialogTrigger className={cn(buttonVariants({ variant: "default" }), "gap-2 ")}>
          <PlusIcon className="h-4 w-4" />
          <span>New Habit</span>
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{habit ? "Edit Habit" : "Create New Habit"}</DialogTitle>
            <DialogDescription>
              {habit ? "Make changes to your habit settings below." : "Start building a better version of yourself today."}
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

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select 
                  value={isCustomCategory ? "custom" : category} 
                  onValueChange={(v: string | null) => {
                    if (v === "custom") {
                      setIsCustomCategory(true)
                      setCategory("")
                    } else {
                      setIsCustomCategory(false)
                      setCategory(v || "General")
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PREDEFINED_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                    <SelectItem value="custom">Custom...</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Routine (Time of Day)</Label>
                {routines.length > 0 ? (
                  <Select 
                    value={(routineId && routines.some(r => r.id === routineId)) ? routineId : "none"} 
                    onValueChange={(v) => setRoutineId(v === "none" ? null : v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select routine">
                        {routines.find(r => r.id === routineId)?.name || "None / Flexible"}
                      </SelectValue>
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
                ) : (
                  <Select disabled value="loading">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Loading routines..." />
                    </SelectTrigger>
                  </Select>
                )}
              </div>
            </div>

            {isCustomCategory && (
              <div className="grid gap-2">
                <Label htmlFor="custom-category">Custom Category Name</Label>
                <Input
                  id="custom-category"
                  placeholder="e.g., Creative, Focus, etc."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
            )}

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
              {habit ? "Update Habit" : "Create Habit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
