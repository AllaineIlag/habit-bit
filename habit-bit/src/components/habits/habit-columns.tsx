"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Habit, Routine, deleteHabit } from "@/actions/habits"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon, TrashIcon, EditIcon, CheckCircleIcon, CircleIcon, ArchiveIcon, RotateCcwIcon } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export const getHabitColumns = (
  routines: Routine[],
  onEdit: (habit: Habit) => void,
  onDelete: (habit: Habit) => void,
  onArchive: (habit: Habit) => void
): ColumnDef<Habit>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          (table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")) as any
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Habit",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return (
        <div className="flex items-center gap-2 font-medium">
          <div className="h-2 w-2 rounded-full bg-primary" />
          {name}
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return <Badge variant="secondary" className="font-normal">{category || "General"}</Badge>
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    cell: ({ row }) => {
      const freq = row.getValue("frequency") as any
      const type = freq?.type || "daily"
      
      let label = type.charAt(0).toUpperCase() + type.slice(1)
      if (type === "weekly" && freq.days) {
        label = `Weekly (${freq.days.length} days)`
      }
      
      return <span className="text-sm text-muted-foreground">{label}</span>
    },
  },
  {
    accessorKey: "routine_id",
    header: "Routine",
    cell: ({ row }) => {
      const routineId = row.getValue("routine_id")
      const routine = routines.find(r => r.id === routineId)
      return (
        <span className="text-sm text-muted-foreground">
          {routine ? routine.name : "Flexible"}
        </span>
      )
    },
  },
  {
    accessorKey: "is_archived",
    header: "Status",
    cell: ({ row }) => {
      const isArchived = row.getValue("is_archived") as boolean
      return (
        <Badge variant={isArchived ? "outline" : "default"} className="gap-1">
          {isArchived ? (
            <>
              <CircleIcon className="h-3 w-3" /> Archived
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-3 w-3" /> Active
            </>
          )}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const habit = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted/50 rounded-lg">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-widest px-2 py-1.5 font-semibold">
                Management
              </DropdownMenuLabel>
              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={() => onEdit(habit)}
              >
                <EditIcon className="h-4 w-4 text-muted-foreground" /> 
                <span>Edit Habit</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={() => onArchive(habit)}
              >
                {habit.is_archived ? (
                  <>
                    <RotateCcwIcon className="h-4 w-4 text-muted-foreground" /> 
                    <span>Restore Habit</span>
                  </>
                ) : (
                  <>
                    <ArchiveIcon className="h-4 w-4 text-muted-foreground" /> 
                    <span>Archive Habit</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={() => navigator.clipboard.writeText(habit.id)}
              >
                <span className="h-4 w-4 text-muted-foreground text-center font-mono text-[10px] leading-4 border rounded">ID</span>
                <span>Copy ID</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive gap-2 cursor-pointer focus:bg-destructive focus:text-destructive-foreground group" 
              onClick={() => onDelete(habit)}
            >
              <TrashIcon className="h-4 w-4 text-destructive group-focus:text-destructive-foreground" /> 
              <span>Delete Permanently</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
