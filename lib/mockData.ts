import type { TransactionData, MonthlyRevenue, ExpenseBreakdown, Transaction, Notification } from './types'

export function generateTransactionData(): TransactionData[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map(day => ({
    day,
    income: Math.floor(Math.random() * 30000) + 40000,
    expenses: Math.floor(Math.random() * 25000) + 35000,
    profit: Math.floor(Math.random() * 15000) + 10000,
  }))
}

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 45000, target: 50000 },
  { month: 'Feb', revenue: 52000, target: 50000 },
  { month: 'Mar', revenue: 48000, target: 50000 },
  { month: 'Apr', revenue: 61000, target: 55000 },
  { month: 'May', revenue: 55000, target: 55000 },
  { month: 'Jun', revenue: 67000, target: 60000 },
]

export const expenseBreakdown: ExpenseBreakdown[] = [
  { name: 'Operations', value: 35, color: '#06b6d4' },
  { name: 'Payroll', value: 30, color: '#8b5cf6' },
  { name: 'Marketing', value: 20, color: '#f59e0b' },
  { name: 'Technology', value: 15, color: '#10b981' },
]

export const recentTransactions: Transaction[] = [
  { id: 'TXN-001', type: 'income', description: 'Payment received', amount: '+$2,450', time: '2m ago', status: 'completed' },
  { id: 'TXN-002', type: 'expense', description: 'Office supplies', amount: '-$340', time: '15m ago', status: 'completed' },
  { id: 'TXN-003', type: 'income', description: 'Subscription fee', amount: '+$890', time: '1h ago', status: 'pending' },
  { id: 'TXN-004', type: 'expense', description: 'Cloud services', amount: '-$1,200', time: '3h ago', status: 'completed' },
  { id: 'TXN-005', type: 'income', description: 'Client payment', amount: '+$5,200', time: '5h ago', status: 'completed' },
]

export const notifications: Notification[] = [
  { id: 1, type: 'alert', message: 'Unusual transaction detected', time: '5m ago', read: false },
  { id: 2, type: 'success', message: 'Payment of $2,450 received', time: '1h ago', read: false },
  { id: 3, type: 'warning', message: 'Monthly limit approaching', time: '2h ago', read: true },
  { id: 4, type: 'info', message: 'New compliance update', time: '1d ago', read: true },
]
