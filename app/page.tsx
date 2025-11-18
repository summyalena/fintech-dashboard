'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/lib/theme'
import LoginPage from '@/components/auth/LoginPage'
import DashboardLayout from '@/components/layout/DashboardLayout'
import OverviewDashboard from '@/components/dashboard/OverviewDashboard'
import UserManagement from '@/components/dashboard/UserManagement'
import RiskCompliance from '@/components/dashboard/RiskCompliance'
import { Wallet, BarChart3 } from 'lucide-react'
import type { User } from '@/lib/types'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [activeView, setActiveView] = useState('overview')
  const [isClient, setIsClient] = useState(false)

  // Wait for client-side mounting
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setActiveView('overview')
  }

  // Show loading state until client-side mounted
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark'

  return (
    <DashboardLayout
      activeView={activeView}
      setActiveView={setActiveView}
      user={user}
      onLogout={handleLogout}
      theme={theme}
      toggleTheme={toggleTheme}
    >
      {activeView === 'overview' && <OverviewDashboard theme={theme} />}
      {activeView === 'users' && <UserManagement theme={theme} />}
      {activeView === 'risk' && <RiskCompliance theme={theme} />}
      
      {/* Placeholder views for other pages */}
      {activeView === 'analytics' && (
        <div className="text-center py-20">
          <BarChart3 className={`w-16 h-16 ${isDark ? 'text-zinc-700' : 'text-zinc-300'} mx-auto mb-4`} />
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-2`}>Analytics View</h3>
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Advanced analytics coming soon...</p>
        </div>
      )}
      
      {activeView === 'transactions' && (
        <div className="text-center py-20">
          <Wallet className={`w-16 h-16 ${isDark ? 'text-zinc-700' : 'text-zinc-300'} mx-auto mb-4`} />
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-2`}>Transactions</h3>
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Transaction management coming soon...</p>
        </div>
      )}
    </DashboardLayout>
  )
}