"use client"

import { Habit, Routine } from "@/actions/habits"
import { HabitTable } from "./habit-table"
import { getHabitColumns } from "./habit-columns"
import { HabitDialog } from "./habit-dialog"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Archive, CheckCircle } from "lucide-react"
import { useState, useMemo } from "react"

interface HabitManagementViewProps {
  initialHabits: Habit[]
  routines: Routine[]
}

export function HabitManagementView({ initialHabits, routines }: HabitManagementViewProps) {
  // Header format: "Tasks 0/Y"
  const headerTitle = "Tasks"
  const headerCount = `0/${initialHabits.length}`

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Management</h2>
        <HabitDialog />
      </div>

      <HabitTable 
        title={headerTitle}
        countText={headerCount}
        columns={(onEdit, onDelete, onArchive) => getHabitColumns(routines, onEdit, onDelete, onArchive)} 
        data={initialHabits} 
      />
    </div>
  )
}
