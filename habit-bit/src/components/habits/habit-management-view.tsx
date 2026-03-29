"use client"

import { Habit, Routine } from "@/actions/habits"
import { HabitTable } from "./habit-table"
import { getHabitColumns } from "./habit-columns"
import { HabitDialog } from "./habit-dialog"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Activity, Archive, CheckCircle } from "lucide-react"

interface HabitManagementViewProps {
  initialHabits: Habit[]
  routines: Routine[]
}

export function HabitManagementView({ initialHabits, routines }: HabitManagementViewProps) {
  const activeHabits = initialHabits.filter(h => !h.is_archived).length
  const archivedHabits = initialHabits.filter(h => h.is_archived).length
  
  return (
    <div className="flex flex-col gap-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialHabits.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeHabits}</div>
          </CardContent>
        </Card>
        <Card className="bg-muted/5 border-muted-foreground/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Archived</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archivedHabits}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Management</h2>
        <HabitDialog />
      </div>

      <HabitTable 
        columns={(onEdit, onDelete, onArchive) => getHabitColumns(routines, onEdit, onDelete, onArchive)} 
        data={initialHabits} 
      />
    </div>
  )
}
