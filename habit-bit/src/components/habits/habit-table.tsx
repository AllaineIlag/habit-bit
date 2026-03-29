"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { SearchIcon, SlidersHorizontalIcon, TrashIcon, XIcon, Loader2Icon, ArchiveIcon, RotateCcwIcon, EditIcon } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HabitDialog } from "@/components/habits/habit-dialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { deleteHabit, deleteHabits, archiveHabit, archiveHabits, type Habit } from "@/actions/habits"

interface DataTableProps<TData, TValue> {
  columns: (
    onEdit: (habit: Habit) => void, 
    onDelete: (habit: Habit) => void,
    onArchive: (habit: Habit) => void
  ) => ColumnDef<TData, TValue>[]
  data: TData[]
}

export function HabitTable<TData, TValue>({
  columns: getColumns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})

  // CRUD States
  const [editingHabit, setEditingHabit] = React.useState<Habit | null>(null)
  const [deletingHabit, setDeletingHabit] = React.useState<Habit | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isBulkDeleting, setIsBulkDeleting] = React.useState(false)
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = React.useState(false)
  const [isArchiving, setIsArchiving] = React.useState(false)
  const [isBulkArchiving, setIsBulkArchiving] = React.useState(false)

  const handleArchive = React.useCallback(async (habit: Habit) => {
    setIsArchiving(true)
    const action = habit.is_archived ? "restore" : "archive"
    try {
      await archiveHabit(habit.id, !habit.is_archived)
      toast.success(`Habit ${action}d successfully`)
    } catch (error) {
      toast.error(`Failed to ${action} habit`)
    } finally {
      setIsArchiving(false)
    }
  }, [])

  const columns = React.useMemo(() => 
    getColumns(
      (habit) => setEditingHabit(habit),
      (habit) => setDeletingHabit(habit),
      handleArchive
    ), 
  [getColumns, handleArchive])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedIds = selectedRows.map((r) => (r.original as Habit).id)

  const handleSingleDelete = async () => {
    if (!deletingHabit) return
    setIsDeleting(true)
    try {
      await deleteHabit(deletingHabit.id)
      toast.success("Habit deleted successfully")
      setDeletingHabit(null)
    } catch (error) {
      toast.error("Failed to delete habit")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleBulkDelete = async () => {
    setIsBulkDeleting(true)
    try {
      await deleteHabits(selectedIds)
      toast.success(`${selectedIds.length} habits deleted successfully`)
      setRowSelection({})
      setShowBulkDeleteConfirm(false)
    } catch (error) {
      toast.error("Failed to delete habits")
    } finally {
      setIsBulkDeleting(false)
    }
  }

  const handleBulkArchive = async (archive: boolean) => {
    setIsBulkArchiving(true)
    try {
      await archiveHabits(selectedIds, archive)
      toast.success(`${selectedIds.length} habits ${archive ? "archived" : "restored"} successfully`)
      setRowSelection({})
    } catch (error) {
      toast.error(`Failed to ${archive ? "archive" : "restore"} habits`)
    } finally {
      setIsBulkArchiving(false)
    }
  }

  return (
    <Card className="relative rounded-[var(--radius-lg)] border bg-card text-card-foreground shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Habit Inventory</CardTitle>
          <CardDescription>Manage your habit definitions and routines.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter habits..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-8 bg-muted/50 border-transparent focus:bg-background h-9 rounded-lg"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <SlidersHorizontalIcon className="h-4 w-4" />
                  View
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {typeof column.columnDef.header === "string" 
                        ? column.columnDef.header 
                        : column.id.replace(/_/g, " ")}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border-t">
          <Table>
            <TableHeader className="bg-muted/30">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="h-10 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group border-b hover:bg-muted/20 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-4 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No habits found. Let's create one!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <div className="flex items-center justify-end space-x-2 p-4 border-t bg-muted/10">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-6 bg-card/95 text-foreground px-6 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl border border-border/50 pointer-events-auto ring-1 ring-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold tracking-tight leading-none">
                  {selectedIds.length} habit{selectedIds.length > 1 ? "s" : ""} selected
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Bulk Actions</span>
              </div>
              
              <div className="h-8 w-[1px] bg-border/50" />
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="h-9 px-4 rounded-xl bg-white/5 hover:bg-white/10 border-white/5 shadow-sm gap-2 transition-all active:scale-95"
                  onClick={() => handleBulkArchive(true)}
                  disabled={isBulkArchiving}
                >
                  <ArchiveIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Archive</span>
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="h-9 px-4 rounded-xl bg-white/5 hover:bg-white/10 border-white/5 shadow-sm gap-2 transition-all active:scale-95"
                  onClick={() => handleBulkArchive(false)}
                  disabled={isBulkArchiving}
                >
                  <RotateCcwIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Restore</span>
                </Button>
                <div className="h-6 w-[1px] bg-border/30 mx-1" />
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="h-9 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 shadow-sm gap-2 transition-all active:scale-95"
                  onClick={() => setShowBulkDeleteConfirm(true)}
                >
                  <TrashIcon className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                  onClick={() => setRowSelection({})}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controlled CRUD Dialogs */}
      <HabitDialog 
        habit={editingHabit || undefined}
        open={!!editingHabit}
        onOpenChange={(open) => !open && setEditingHabit(null)}
      />

      <AlertDialog
        open={!!deletingHabit}
        onOpenChange={(open) => !open && setDeletingHabit(null)}
        title="Delete Habit"
        description={`Are you sure you want to delete "${deletingHabit?.name}"? This action cannot be undone.`}
        actionText="Delete"
        isDestructive
        isLoading={isDeleting}
        onAction={handleSingleDelete}
      />

      <AlertDialog
        open={showBulkDeleteConfirm}
        onOpenChange={setShowBulkDeleteConfirm}
        title="Delete Habits"
        description={`Are you sure you want to delete ${selectedIds.length} habits? This action cannot be undone.`}
        actionText={isBulkDeleting ? "Deleting..." : `Delete ${selectedIds.length}`}
        isDestructive
        isLoading={isBulkDeleting}
        onAction={handleBulkDelete}
      />
    </Card>
  )
}
