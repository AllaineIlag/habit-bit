import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "sonner"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habit-bit",
  description: "Track your Habits and focus blocks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased dark`}>
        <TooltipProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" closeButton richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
