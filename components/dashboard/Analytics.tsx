'use client'

import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, DollarSign, Activity, Users, RefreshCw, Download } from 'lucide-react'
import KPICard from '../ui/Kpi-card';
import { useTheme } from '@/lib/theme';


// Mock data generators
const generateGrowthData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map(month => ({
    month,
    revenue: Math.floor(Math.random() * 50000) + 80000,
    users: Math.floor(Math.random() * 500) + 1000,
    transactions: Math.floor(Math.random() * 2000) + 3000,
  }))
}

const generatePerformanceData = () => {
  const categories = ['Q1', 'Q2', 'Q3', 'Q4']
  return categories.map(quarter => ({
    quarter,
    actual: Math.floor(Math.random() * 100000) + 200000,
    target: Math.floor(Math.random() * 80000) + 220000,
    growth: Math.floor(Math.random() * 30) + 10,
  }))
}

const generateUserGrowth = () => {
  const weeks = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`)
  return weeks.map(week => ({
    week,
    newUsers: Math.floor(Math.random() * 200) + 100,
    activeUsers: Math.floor(Math.random() * 500) + 800,
    churnedUsers: Math.floor(Math.random() * 50) + 10,
  }))
}

export default function Analytics() {
  const [growthData, setGrowthData] = useState(generateGrowthData())
  const [performanceData, setPerformanceData] = useState(generatePerformanceData())
  const [userGrowthData, setUserGrowthData] = useState(generateUserGrowth())
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const {theme} = useTheme();
  const isDark = theme === 'dark'

  const refreshData = () => {
    setGrowthData(generateGrowthData())
    setPerformanceData(generatePerformanceData())
    setUserGrowthData(generateUserGrowth())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-2`}>Analytics Dashboard</h2>
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Advanced metrics and performance insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className={`px-4 py-2 ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'} border rounded-lg focus:outline-none focus:border-cyan-500`}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={refreshData}
            className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800' : 'bg-white hover:bg-zinc-50 border-zinc-200'} border rounded-lg transition-colors`}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$2.4M"
          change="+18.2%"
          changeType="positive"
          icon={DollarSign}
          trend={true}
        />
        <KPICard
          title="Growth Rate"
          value="23.5%"
          change="+5.4%"
          changeType="positive"
          icon={TrendingUp}
          trend={true}
        />
        <KPICard
          title="Active Users"
          value="12,458"
          change="+12.8%"
          changeType="positive"
          icon={Users}
          trend={true}
        />
        <KPICard
          title="Avg. Transaction"
          value="$487"
          change="-2.3%"
          changeType="negative"
          icon={Activity}
          trend={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth Chart */}
        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-4`}>Revenue Growth (YTD)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
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
              <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quarterly Performance */}
        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-4`}>Quarterly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272a' : '#e4e4e7'} />
              <XAxis dataKey="quarter" stroke={isDark ? '#71717a' : '#a1a1aa'} />
              <YAxis stroke={isDark ? '#71717a' : '#a1a1aa'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#18181b' : '#ffffff',
                  border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="actual" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className={`lg:col-span-2 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-4`}>User Growth Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272a' : '#e4e4e7'} />
              <XAxis dataKey="week" stroke={isDark ? '#71717a' : '#a1a1aa'} />
              <YAxis stroke={isDark ? '#71717a' : '#a1a1aa'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#18181b' : '#ffffff',
                  border: `1px solid ${isDark ? '#27272a' : '#e4e4e7'}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="newUsers" stroke="#06b6d4" fillOpacity={1} fill="url(#colorNew)" strokeWidth={2} />
              <Area type="monotone" dataKey="activeUsers" stroke="#10b981" fillOpacity={1} fill="url(#colorActive)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Best Performing</p>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>Q4 Revenue</p>
            </div>
          </div>
          <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Revenue grew by 34% compared to Q3, exceeding targets by $45K
          </p>
        </div>

        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>User Retention</p>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>89.3%</p>
            </div>
          </div>
          <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Above industry average of 85%, showing strong product-market fit
          </p>
        </div>

        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Transaction Volume</p>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>+127%</p>
            </div>
          </div>
          <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Significant increase in transaction velocity month-over-month
          </p>
        </div>
      </div>
    </div>
  )
}
