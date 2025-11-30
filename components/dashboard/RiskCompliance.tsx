'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { riskAPI } from '@/lib/api'
import { useTheme } from '@/lib/theme'

export default function RiskCompliance() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [fraudStats, setFraudStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('');
  const {theme} = useTheme();
  const isDark = theme === 'dark'

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const [alertsResponse, statsResponse] = await Promise.all([
        riskAPI.getAlerts(),
        riskAPI.getFraudStats(),
      ])
      setAlerts(alertsResponse.data)
      setFraudStats(statsResponse.data)
    } catch (err: any) {
      setError(err.message || 'Failed to load risk data')
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
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
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
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-2`}>Risk & Compliance</h2>
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Monitor suspicious activity</p>
        </div>
        <button
          onClick={loadData}
          className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800' : 'bg-white hover:bg-zinc-50 border-zinc-200'} border rounded-lg transition-colors`}
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm">Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fraud Distribution Chart */}
        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-4`}>Fraud Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={fraudStats.distribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {fraudStats.distribution.map((entry: any, index: number) => (
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
            {fraudStats.distribution.map((item: any, idx: number) => (
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

        {/* High-Risk Alerts */}
        <div className={`lg:col-span-2 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>High-Risk Alerts</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">{alerts.length} Active</span>
            </div>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} border rounded-lg hover:border-red-500/50 transition-colors`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        alert.risk === 'High' ? 'bg-red-500/10' : 'bg-amber-500/10'
                      }`}
                    >
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          alert.risk === 'High' ? 'text-red-400' : 'text-amber-400'
                        }`}
                      />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{alert.type}</p>
                      <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mt-1`}>{alert.user}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      alert.risk === 'High'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {alert.risk} Risk
                  </span>
                </div>
                <div className={`flex items-center justify-between mt-3 pt-3 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {alert.amount || alert.attempts || alert.location || alert.count}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}