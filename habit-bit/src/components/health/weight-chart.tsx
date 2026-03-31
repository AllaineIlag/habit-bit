"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getWeightHistory } from "@/actions/health"
import { Button } from "@/components/ui/button"
import { Scale, TrendingDown, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const chartConfig = {
  weight: {
    label: "Weight",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function WeightChart() {
  const [range, setRange] = React.useState<7 | 30 | 90>(7)
  const [data, setData] = React.useState<{ date: string; weight: number }[]>([])
  const [loading, setLoading] = React.useState(true)

  const fetchData = React.useCallback(async () => {
    setLoading(true)
    try {
      const history = await getWeightHistory(range)
      setData(history)
    } finally {
      setLoading(false)
    }
  }, [range])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const goalWeight = 70

  return (
    <Card className="rounded-[var(--radius-lg)] border-none bg-card/50 backdrop-blur-xl ring-1 ring-border/50 overflow-hidden shadow-2xl transition-all hover:ring-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/10">
        <div className="grid gap-1">
          <CardTitle className="text-lg font-bold flex items-center gap-2 tracking-tight">
            <Scale className="h-5 w-5 text-primary" />
            Weight Progress
          </CardTitle>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <TrendingDown className="h-3 w-3 text-emerald-500" />
            <span>Target: {goalWeight}kg</span>
          </div>
        </div>
        <div className="flex items-center bg-muted/30 p-1 rounded-lg border border-border/5">
          {( [7, 30, 90] as const).map((r) => (
            <Button
              key={r}
              variant={range === r ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "h-7 px-3 text-[10px] uppercase tracking-wider font-bold rounded-md transition-all",
                range === r ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setRange(r)}
            >
              {r === 7 ? "7 Days" : r === 30 ? "1 Month" : "3 Months"}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[240px] w-full flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Calculating progress...</span>
              </div>
            </motion.div>
          ) : data.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[240px] w-full flex items-center justify-center border-2 border-dashed border-border/50 rounded-[var(--radius-lg)]"
            >
              <div className="flex flex-col items-center gap-2 text-center px-4">
                <Target className="h-8 w-8 text-muted-foreground/30" />
                <p className="text-sm font-medium text-muted-foreground">No data for this period</p>
                <p className="text-[10px] text-muted-foreground/50">Start logging your weight to see the trend.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              <ChartContainer config={chartConfig} className="h-[240px] w-full">
                <AreaChart
                  data={data}
                  margin={{
                    left: -20,
                    right: 12,
                    top: 10,
                    bottom: 0
                  }}
                >
                  <defs>
                    <linearGradient id="fillWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-weight)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-weight)"
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tickFormatter={(value) => {
                      const date = new Date(value)
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    fontSize={10}
                    fontWeight={600}
                    stroke="rgba(255,255,255,0.3)"
                  />
                  <YAxis
                    hide
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                  <ChartTooltip
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <ReferenceLine
                    y={goalWeight}
                    stroke="var(--bento-success)"
                    strokeDasharray="4 4"
                    label={{
                      position: "right",
                      value: `Goal ${goalWeight}kg`,
                      fill: "var(--bento-success)",
                      fontSize: 10,
                      fontWeight: 800,
                      className: "uppercase tracking-tighter"
                    }}
                  />
                  <Area
                    dataKey="weight"
                    type="natural"
                    fill="url(#fillWeight)"
                    fillOpacity={0.4}
                    stroke="var(--color-weight)"
                    strokeWidth={2.5}
                    stackId="a"
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                </AreaChart>
              </ChartContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

