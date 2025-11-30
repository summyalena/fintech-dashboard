'use client'

import { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface KPICardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative'
  icon: LucideIcon
  trend?: boolean
}

export default function KPICard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  trend,
}: KPICardProps) {

  const {theme: currentTheme} = useTheme();
  const isDark = currentTheme === 'dark';
  
  return (
    <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-100'} rounded-lg`}>
          <Icon className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
        </div>
        {trend && change && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              changeType === 'positive'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {changeType === 'positive' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className={`${isDark ? 'text-zinc-400' : 'text-zinc-600'} text-sm font-medium`}>{title}</p>
        <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{value}</p>
      </div>
    </div>
  )
}
