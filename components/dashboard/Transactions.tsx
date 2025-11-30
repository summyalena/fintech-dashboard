'use client'

import { useState } from 'react'
import { Search, Download, ArrowUpRight, ArrowDownRight, MoreVertical, CheckCircle, Clock, XCircle } from 'lucide-react'

interface TransactionsProps {
  theme: 'light' | 'dark'
}

interface Transaction {
  id: string
  type: 'income' | 'expense'
  description: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  date: string
  time: string
  category: string
  from?: string
  to?: string
}

const generateTransactions = (): Transaction[] => {
  const types: Array<'income' | 'expense'> = ['income', 'expense']
  const statuses: Array<'completed' | 'pending' | 'failed'> = ['completed', 'pending', 'failed']
  const categories = ['Payment', 'Refund', 'Subscription', 'Transfer', 'Purchase', 'Salary']
  const descriptions = [
    'Payment received from client',
    'Office supplies purchase',
    'Monthly subscription fee',
    'Refund processed',
    'Salary payment',
    'Cloud services payment',
    'Marketing expenses',
    'Equipment purchase',
  ]

  return Array.from({ length: 20 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)]
    const amount = Math.floor(Math.random() * 5000) + 100
    
    return {
      id: `TXN-${String(i + 1001).padStart(4, '0')}`,
      type,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      amount,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      from: type === 'income' ? 'Client Account' : 'Company Account',
      to: type === 'income' ? 'Company Account' : 'Vendor',
    }
  })
}

export default function Transactions({ theme }: TransactionsProps) {
  const [transactions] = useState<Transaction[]>(generateTransactions())
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')
  const isDark = theme === 'dark'

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || txn.type === typeFilter
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const totalIncome = transactions.filter(t => t.type === 'income' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)
  const netBalance = totalIncome - totalExpense

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-2`}>Transactions</h2>
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Manage and monitor all financial transactions</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Export CSV</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Total Income</p>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <ArrowDownRight className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>${totalIncome.toLocaleString()}</p>
          <p className="text-xs text-emerald-400 mt-1">+12.5% from last month</p>
        </div>

        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Total Expenses</p>
            <div className="p-2 bg-red-500/10 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-red-400" />
            </div>
          </div>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>${totalExpense.toLocaleString()}</p>
          <p className="text-xs text-red-400 mt-1">+3.2% from last month</p>
        </div>

        <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Net Balance</p>
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>${netBalance.toLocaleString()}</p>
          <p className="text-xs text-cyan-400 mt-1">Positive cash flow</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'} border rounded-lg placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors`}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as any)}
          className={`px-4 py-3 ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'} border rounded-lg focus:outline-none focus:border-cyan-500`}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className={`px-4 py-3 ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'} border rounded-lg focus:outline-none focus:border-cyan-500`}
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} rounded-xl border overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-zinc-950' : 'bg-zinc-50'}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>Transaction ID</th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>Description</th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>Type</th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>Amount</th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>Status</th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>Date</th>
                <th className={`px-6 py-4 text-left text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-zinc-800' : 'divide-zinc-200'}`}>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className={`${isDark ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-50'} transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className={`text-sm font-mono ${isDark ? 'text-white' : 'text-zinc-900'}`}>{txn.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-zinc-900'}`}>{txn.description}</p>
                      <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{txn.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${txn.type === 'income' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                        {txn.type === 'income' ? (
                          <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <span className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'} capitalize`}>{txn.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className={`text-sm font-bold ${txn.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      txn.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                      txn.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {txn.status === 'completed' ? <CheckCircle className="w-3 h-3" /> :
                       txn.status === 'pending' ? <Clock className="w-3 h-3" /> :
                       <XCircle className="w-3 h-3" />}
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-zinc-900'}`}>{txn.date}</p>
                      <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{txn.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className={`p-2 ${isDark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'} rounded-lg transition-colors`}>
                      <MoreVertical className="w-5 h-5 text-zinc-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Count */}
      <div className={`flex items-center justify-between text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
        <p>Showing {filteredTransactions.length} of {transactions.length} transactions</p>
        <p>Page 1 of {Math.ceil(transactions.length / 20)}</p>
      </div>
    </div>
  )
}