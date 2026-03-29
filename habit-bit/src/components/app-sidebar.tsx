'use client'

import * as React from "react"
import { 
  NAV_PLATFORM, 
  NAV_SYSTEM,
  NAV_MANAGEMENT,
  type NavItem
} from "@/config/navigation"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BrainCircuitIcon } from "lucide-react"

const user = {
  name: "User",
  email: "hello@habitbit.app",
  avatar: "/avatars/user.jpg",
}

const teams = [
  {
    name: "Habit-bit",
    logo: <BrainCircuitIcon className="size-4" />,
    plan: "Personal",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Map our config to include rendered icons for components that expect ReactNodes
  const navPlatformParsed = NAV_PLATFORM.map((item: NavItem) => ({
    ...item,
    icon: <item.icon className="h-4 w-4" />
  }))

  const navManagementParsed = NAV_MANAGEMENT.map((item: NavItem) => ({
    ...item,
    icon: <item.icon className="h-4 w-4" />
  }))

  const navSystemParsed = NAV_SYSTEM.map((item: NavItem) => ({
    ...item,
    icon: <item.icon className="h-4 w-4" />
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent className="gap-0 border-none">
        <NavMain items={navPlatformParsed} label="Platform" />
        <NavMain items={navManagementParsed} label="Management" />
        <NavMain items={navSystemParsed} label="System" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
