'use client'

import { LayoutDashboard, Users, Shield, CreditCard, LogOut, Sun, Moon, Wallet, BarChart3 } from 'lucide-react'
import type { User } from '@/lib/types'

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  user: User | null
  onLogout: () => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export default function Sidebar({ 
  activeView, 
  setActiveView, 
  user, 
  onLogout, 
  theme, 
  toggleTheme 
}: SidebarProps) {
  const isDark = theme === 'dark'
  
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: Wallet },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'risk', label: 'Risk & Compliance', icon: Shield },
  ]

  return (
    <div className={`w-64 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} border-r h-screen fixed left-0 top-0 flex flex-col z-50`}>
      {/* Logo */}
      <div className={`p-6 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>LedgerView</h1>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Operations</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeView === item.id
                ? 'bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/5'
                : `${isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'}`
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile & Settings */}
      <div className={`p-4 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'} space-y-2`}>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-4 py-3 ${isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'} rounded-lg transition-all`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-zinc-900'} truncate`}>{user?.name}</p>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'} truncate`}>{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-2 px-4 py-2 ${isDark ? 'text-zinc-400 hover:text-red-400 hover:bg-zinc-900' : 'text-zinc-600 hover:text-red-600 hover:bg-zinc-100'} rounded-lg transition-all`}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}