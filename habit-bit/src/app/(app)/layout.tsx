import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </SidebarProvider>
  );
}
