// import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import { Inter } from "next/font/google"
import Sidebar from "@/components/sidebar"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { TopNav } from "@/components/top-navbar"
import { authOptions } from "@/config/authoptions"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SettingsProvider } from "@/contexts/settings-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Meal-Port-App",
  description: "A modern, responsive financial dashboard",
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)
    // console.log(session, 'jovan');
    if (!session ) {
      console.log(session, 'there session part');
      redirect('/')
    } 
    
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='bg-[#EEE9DB]'>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          <SettingsProvider>
            <TooltipProvider delayDuration={0}>
              <div className="min-h-screen flex">
                <Sidebar />
                <div className="flex-1">
                  <TopNav />
                  <div className="container mx-auto p-6 max-w-7xl">
                    <main className="w-full">{children}</main>
                  </div>
                </div>
              </div>
            </TooltipProvider>
          </SettingsProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
