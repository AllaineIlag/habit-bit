"use client"

import * as React from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { bulkUpdateHabits, getRoutines, type Routine, type HabitUpdate } from "@/actions/habits"
import { useState, useTransition, useEffect } from "react"
import { Loader2Icon } from "lucide-react"
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

const PREDEFINED_CATEGORIES = [
  "General", "Health", "Growth", "Productivity", "Mindset", 
  "Progress", "Morning Ritual", "Evening Ritual", "Discipline", "Housekeeping"
]

interface BulkEditDialogProps {
  selectedIds: string[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: () => void
}

export function BulkEditDialog({ selectedIds, open, onOpenChange, onComplete }: BulkEditDialogProps) {
  const [isPending, startTransition] = useTransition()
  
  // Toggles for whether to update a field
  const [updateCategory, setUpdateCategory] = useState(false)
  const [updateRoutine, setUpdateRoutine] = useState(false)
  const [updateFrequency, setUpdateFrequency] = useState(false)

  // Field Values
  const [category, setCategory] = useState(PREDEFINED_CATEGORIES[0])
  const [routineId, setRoutineId] = useState<string | null>(null)
  
  // Frequency State
  const [frequencyType, setFrequencyType] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily")
  const [weeklyDays, setWeeklyDays] = useState<number[]>([1, 2, 3, 4, 5])

  const [routines, setRoutines] = useState<Routine[]>([])

  useEffect(() => {
    let active = true
    const fetchRoutines = async () => {
      try {
        const data = await getRoutines()
        if (!active) return
        setRoutines(data)
      } catch (err) {
        console.error("Failed to fetch routines:", err)
      }
    }
    fetchRoutines()
    return () => { active = false }
  }, [])

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setUpdateCategory(false)
      setUpdateRoutine(false)
      setUpdateFrequency(false)
      setCategory(PREDEFINED_CATEGORIES[0])
      setRoutineId(null)
      setFrequencyType("daily")
      setWeeklyDays([1, 2, 3, 4, 5])
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!updateCategory && !updateRoutine && !updateFrequency) {
      toast.error("Please select at least one field to update")
      return
    }

    startTransition(async () => {
      try {
        const updates: HabitUpdate = {}
        
        if (updateCategory) {
          updates.category = category
        }

        if (updateRoutine) {
          updates.routine_id = routineId
        }

        if (updateFrequency) {
          let frequency: any = { type: frequencyType }
          if (frequencyType === "weekly") {
            frequency.days = weeklyDays
          } else if (frequencyType === "monthly") {
            frequency.day = 1
          } else if (frequencyType === "yearly") {
            frequency.month = 0
            frequency.day = 1
          }
          updates.frequency = frequency
        }

        await bulkUpdateHabits(selectedIds, updates)
        toast.success(`Successfully updated ${selectedIds.length} habits`)
        onComplete()
        onOpenChange(false)
      } catch (error) {
        console.error("Failed to bulk update habits:", error)
        toast.error("Failed to update habits")
      }
    })
  }

  const toggleDay = (day: number) => {
    setWeeklyDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Bulk Edit {selectedIds.length} Habits</DialogTitle>
            <DialogDescription>
              Select the fields you want to update for all chosen habits. Checked fields overwrite existing data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Category Toggle & Select */}
            <div className="flex flex-col gap-3 p-3 bg-muted/20 border rounded-xl">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="toggle-category" 
                  checked={updateCategory} 
                  onCheckedChange={(c) => setUpdateCategory(!!c)} 
                />
                <Label htmlFor="toggle-category" className="font-semibold cursor-pointer">Update Category</Label>
              </div>
              
              {updateCategory && (
                <div className="pl-6 pt-1">
                  <Select value={category} onValueChange={(v) => setCategory(v || PREDEFINED_CATEGORIES[0])}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {PREDEFINED_CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Routine Toggle & Select */}
            <div className="flex flex-col gap-3 p-3 bg-muted/20 border rounded-xl">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="toggle-routine" 
                  checked={updateRoutine} 
                  onCheckedChange={(c) => setUpdateRoutine(!!c)} 
                />
                <Label htmlFor="toggle-routine" className="font-semibold cursor-pointer">Update Routine</Label>
              </div>
              
              {updateRoutine && (
                <div className="pl-6 pt-1">
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
              )}
            </div>

            {/* Frequency Toggle & Select */}
            <div className="flex flex-col gap-3 p-3 bg-muted/20 border rounded-xl">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="toggle-frequency" 
                  checked={updateFrequency} 
                  onCheckedChange={(c) => setUpdateFrequency(!!c)} 
                />
                <Label htmlFor="toggle-frequency" className="font-semibold cursor-pointer">Update Frequency</Label>
              </div>

              {updateFrequency && (
                <div className="pl-6 pt-1 grid gap-3">
                  <Select value={frequencyType} onValueChange={(v) => v && setFrequencyType(v as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>

                  {frequencyType === "weekly" && (
                     <div className="flex flex-wrap gap-2 pt-2">
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
                  )}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || (!updateCategory && !updateRoutine && !updateFrequency)}>
              {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Apply to {selectedIds.length} items
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
