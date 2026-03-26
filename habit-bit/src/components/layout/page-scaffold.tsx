import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface PageScaffoldProps {
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function PageScaffold({ title, children, actions }: PageScaffoldProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </header>
      <main 
        className="flex-1 overflow-auto p-4 md:p-6"
        style={{
          maxWidth: "var(--page-max-width)",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
    </div>
  )
}
