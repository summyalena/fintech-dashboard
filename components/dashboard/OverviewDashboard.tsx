'use client'

import { useState, useEffect } from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { DollarSign, Activity, Users, Clock, ArrowDownRight, ArrowUpRight, RefreshCw } from 'lucide-react'
import KPICard from '../ui/Kpi-card'
import { dashboardAPI } from '@/lib/api'
import type { DashboardData } from '@/lib/types'
import { useTheme } from '@/lib/theme' // Add this import

// Remove the theme prop from the interface
export default function OverviewDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { theme } = useTheme() // Use the hook internally
  const isDark = theme === 'dark'

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await dashboardAPI.getOverview()
      setData(response.data)
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Loading dashboard data from API...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-xl">
        <p className="text-red-400">{error}</p>
        <button
          onClick={loadData}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-2`}>Overview Dashboard</h2>
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Real-time financial health metrics from API</p>
        </div>
        <button
          onClick={loadData}
          className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800' : 'bg-white hover:bg-zinc-50 border-zinc-200'} border rounded-lg transition-colors`}
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm">Refresh</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={data.kpis.totalRevenue.value}
          change={data.kpis.totalRevenue.change}
          changeType={data.kpis.totalRevenue.trend === 'up' ? 'positive' : 'negative'}
          icon={DollarSign}
          trend={true}
        />
        <KPICard
          title="Transactions"
          value={data.kpis.transactionsPerHour.value}
          change={data.kpis.transactionsPerHour.change}
          changeType={data.kpis.transactionsPerHour.trend === 'up' ? 'positive' : 'negative'}
          icon={Activity}
          trend={true}
          // Remove theme prop from KPICard
        />
        <KPICard
          title="Active Users"
          value={data.kpis.activeUsers.value}
          change={data.kpis.activeUsers.change}
          changeType={data.kpis.activeUsers.trend === 'up' ? 'positive' : 'negative'}
          icon={Users}
          trend={true}
          // Remove theme prop from KPICard
        />
        <KPICard
          title="Pending"
          value={data.kpis.pendingPayouts.value}
          change={data.kpis.pendingPayouts.change}
          changeType={data.kpis.pendingPayouts.trend === 'up' ? 'positive' : 'negative'}
          icon={Clock}
          trend={true}
          // Remove theme prop from KPICard
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview Chart */}
        <div className={`lg:col-span-2 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-4`}>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.transactions}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272a' : '#e4e4e7'} />
              <XAxis dataKey="day" stroke={isDark ? '#71717a' : '#a1a1aa'} />
              <YAxis stroke={isDark ? '#71717a' : '#a1a1aa'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#18181b' : '#ffffff',
                  border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#06b6d4"
                fillOpacity={1}
                fill="url(#colorIncome)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorExpenses)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-4`}>Recent Transactions</h3>
          <div className="space-y-4">
            {data.recentTransactions.slice(0, 4).map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-start gap-3 pb-4 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} last:border-0 last:pb-0`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    transaction.type === 'income' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {transaction.description}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {transaction.time}
                  </p>
                </div>
                <p
                  className={`text-sm font-bold ${
                    transaction.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-4`}>Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272a' : '#e4e4e7'} />
              <XAxis dataKey="month" stroke={isDark ? '#71717a' : '#a1a1aa'} />
              <YAxis stroke={isDark ? '#71717a' : '#a1a1aa'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#18181b' : '#ffffff',
                  border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-4`}>Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data.expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#18181b' : '#ffffff',
                  border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {data.expenseBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>{item.name}</span>
                </div>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}