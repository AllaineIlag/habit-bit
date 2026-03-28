import { Habit, HabitLog } from "@/actions/habits"
import { cn } from "@/lib/utils"
import { getLastNDays, getZonedToday } from "@/lib/date-utils"

interface HabitCardProps {
  habit: Habit
  isCompletedToday: boolean
  activityLogs: HabitLog[]
}

/** Build a Set of "YYYY-MM-DD" strings from the logs for fast lookup */

const GRID_DAYS = 140 // 7 rows × 20 columns

export function HabitCard({ habit, isCompletedToday, activityLogs }: HabitCardProps) {
  const completedSet = new Set(activityLogs.map(log => log.completed_at))
  const days = getLastNDays(GRID_DAYS)
  const today = getZonedToday()

  return (
    <div
      className={cn(
        "group relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--bento-border-glass)]",
        "flex flex-col bg-[var(--bento-card-bg)] backdrop-blur-md",
        "transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[var(--bento-accent)]/10",
        "h-full min-h-[160px]"
      )}
    >
      {/* ── Premium Gradient Overlay ─────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bento-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* ── Top Section: Name only ─────────────────── */}
      <div className="px-5 py-5 flex flex-col gap-1 relative z-10">
        <h3 className="text-[var(--font-size-base)] font-bold tracking-tight text-white/90 leading-tight group-hover:text-white transition-colors">
          {habit.name}
        </h3>
        <p className="text-[var(--text-micro)] text-[var(--bento-text-muted)] font-medium uppercase tracking-[0.1em] opacity-60">
          {JSON.parse(JSON.stringify(habit.frequency))?.type || "Daily"}
        </p>
      </div>

      {/* ── Bottom Section: Dense Activity Dot Grid ─────────── */}
      <div
        className="px-5 pt-4 pb-5 bg-white/[0.02] border-t border-[var(--bento-border-glass)] mt-auto relative z-10"
      >
        <div
          className="grid grid-flow-col gap-[4px]"
          style={{ 
            gridTemplateRows: "repeat(7, 1fr)",
            gridTemplateColumns: "repeat(20, 1fr)"
          }}
        >
          {days.map((day) => {
            const done = completedSet.has(day)
            const isToday = day === today
            return (
              <div
                key={day}
                title={day}
                className={cn(
                  "aspect-square rounded-[2px] transition-all duration-500",
                  done
                    ? "bg-[var(--bento-accent)] shadow-[0_0_8px_var(--bento-accent)]/20"
                    : "bg-white/5 group-hover:bg-white/10"
                )}
                style={{ 
                  width: "100%", 
                  height: "auto",
                  opacity: done ? (isToday ? 1 : 0.7) : 0.3
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
