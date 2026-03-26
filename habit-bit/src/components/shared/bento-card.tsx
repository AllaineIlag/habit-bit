"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"

interface BentoCardProps extends React.ComponentProps<typeof Card> {
  /**
   * Optional icon to display in the header
   */
  icon?: React.ReactNode
  /**
   * Visual intensity of the glass effect
   * @default "default"
   */
  variant?: "default" | "vibrant" | "subtle"
}

/**
 * BentoCard: A premium, token-driven card designed for the Habit-bit dashboard.
 * Includes glassmorphism effects, hover interactions, and consistent spacing.
 */
export function BentoCard({ 
  className, 
  icon, 
  title, 
  children, 
  variant = "default",
  ...props 
}: BentoCardProps) {
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "bg-card/40 backdrop-blur-md border-[var(--border)]",
        "hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/5",
        "hover:border-primary/20",
        variant === "vibrant" && "bg-primary/5 border-primary/10",
        variant === "subtle" && "bg-transparent border-dashed",
        className
      )}
      {...props}
    >
      {(title || icon) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          {title && <CardTitle className="text-sm font-medium tracking-tight">{title}</CardTitle>}
          {icon && <div className="text-muted-foreground transition-colors group-hover:text-primary">{icon}</div>}
        </CardHeader>
      )}
      <CardContent className="pt-2">
        {children}
      </CardContent>
    </Card>
  )
}
