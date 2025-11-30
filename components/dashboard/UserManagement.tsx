'use client'

import { useState, useEffect } from 'react'
import { Search, MoreVertical, CheckCircle, Lock, Clock, RefreshCw } from 'lucide-react'
import { usersAPI } from '@/lib/api'
import type { UserAccount } from '@/lib/types'
import { useTheme } from '@/lib/theme'

export default function UserManagement() {
  const [users, setUsers] = useState<UserAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All');
  const {theme} = useTheme();
  const isDark = theme === 'dark'

  const loadUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await usersAPI.getAll({
        status: statusFilter !== 'All' ? statusFilter : undefined,
        search: searchTerm || undefined,
      })
      setUsers(response.data)
    } catch (err: any) {
      setError(err.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadUsers()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, statusFilter])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-2`}>User Management</h2>
        </div>
        <button
          onClick={loadUsers}
          className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800' : 'bg-white hover:bg-zinc-50 border-zinc-200'} border rounded-lg transition-colors`}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="text-sm">Refresh</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'} border rounded-lg placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`px-4 py-3 ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'} border rounded-lg focus:outline-none focus:border-cyan-500 transition-colors`}
        >
          <option>All</option>
          <option>Active</option>
          <option>KYC Pending</option>
          <option>Locked</option>
        </select>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Users Table */}
      <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl border overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-zinc-950' : 'bg-zinc-50'}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>
                  User
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>
                  Status
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>
                  KYC
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>
                  Balance
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>
                  Last Active
                </th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-zinc-800' : 'divide-zinc-200'}`}>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
                      <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className={`px-6 py-8 text-center ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className={`${isDark ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-50'} transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-zinc-900'}`}>{user.name}</div>
                        <div className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : user.status === 'Locked'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {user.status === 'Active' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : user.status === 'Locked' ? (
                          <Lock className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.kyc === 'Verified'
                            ? 'bg-blue-500/10 text-blue-400'
                            : `${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-200 text-zinc-700'}`
                        }`}
                      >
                        {user.kyc}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      {user.balance}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className={`p-2 ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'} rounded-lg transition-colors`}>
                        <MoreVertical className="w-5 h-5 text-zinc-500" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && users.length > 0 && (
        <div className={`flex items-center justify-between text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          <p>Showing {users.length} users</p>
          <p>Loaded</p>
        </div>
      )}
    </div>
  )
}