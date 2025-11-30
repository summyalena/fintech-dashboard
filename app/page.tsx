// app/page.tsx
'use client'

import { useState } from 'react'
import LoginPage from '@/components/auth/LoginPage'
import DashboardLayout from '@/components/layout/DashboardLayout'
import OverviewDashboard from '@/components/dashboard/OverviewDashboard'
import Analytics from '@/components/dashboard/Analytics'
import Transactions from '@/components/dashboard/Transactions'
import UserManagement from '@/components/dashboard/UserManagement'
import RiskCompliance from '@/components/dashboard/RiskCompliance'
import type { User } from '@/lib/types'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [activeView, setActiveView] = useState('overview')

  const handleLogin = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setActiveView('overview')
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <DashboardLayout
      activeView={activeView}
      setActiveView={setActiveView}
      user={user}
      onLogout={handleLogout}
    >
      {activeView === 'overview' && <OverviewDashboard />}
      {activeView === 'analytics' && <Analytics />}
      {activeView === 'transactions' && <Transactions />}
      {activeView === 'users' && <UserManagement />}
      {activeView === 'risk' && <RiskCompliance />}
    </DashboardLayout>
  )
}