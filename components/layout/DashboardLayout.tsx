'use client'

import { ReactNode } from 'react'
import Sidebar from '../navigation/Sidebar'
import type { User } from '@/lib/types'
import { useTheme } from '@/lib/theme'

interface DashboardLayoutProps {
  children: ReactNode
  activeView: string
  setActiveView: (view: string) => void
  user: User | null
  onLogout: () => void
}

export default function DashboardLayout({
  children,
  activeView,
  setActiveView,
  user,
  onLogout,
}: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-zinc-50'}`}>
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}