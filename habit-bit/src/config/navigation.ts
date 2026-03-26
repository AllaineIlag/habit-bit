import { 
  LayoutDashboard, 
  RefreshCcw, 
  BarChart3, 
  Settings,
  Sparkles,
  CheckCircle2,
  Calendar,
  Book,
  Map as MapIcon,
  LayoutGrid,
  type LucideIcon
} from "lucide-react"

export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export const NAV_MAIN: NavItem[] = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Habits",
    url: "/habits",
    icon: RefreshCcw,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: CheckCircle2,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Books",
    url: "/books",
    icon: Book,
  },
  {
    title: "Map",
    url: "/map",
    icon: MapIcon,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
]

export const NAV_SECONDARY: NavItem[] = [
  {
    title: "Labs",
    url: "/labs",
    icon: LayoutGrid,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export const PROJECTS = [] as any
