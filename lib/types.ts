export interface User {
  email: string
  name: string
  role: string
}

export interface TransactionData {
  day: string
  income: number
  expenses: number
  profit: number
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  target: number
}

export interface ExpenseBreakdown {
  name: string
  value: number
  color: string
  [key: string]: string | number 
}

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  description: string
  amount: string
  time: string
  status: 'completed' | 'pending' | 'failed'
}

export interface Notification {
  id: number
  type: 'alert' | 'success' | 'warning' | 'info'
  message: string
  time: string
  read: boolean
}

export interface UserAccount {
  id: string
  name: string
  email: string
  status: 'Active' | 'KYC Pending' | 'Locked'
  kyc: 'Verified' | 'Pending'
  balance: string
  lastActive: string
  joinDate: string
}

export interface RiskAlert {
  id: string
  type: string
  user: string
  amount?: string
  attempts?: number
  location?: string
  count?: string
  risk: 'High' | 'Medium'
  time: string
  timestamp: string
  resolved: boolean
}

export interface DashboardData {
  kpis: {
    totalRevenue: { value: string; change: string; trend: string }
    transactionsPerHour: { value: string; change: string; trend: string }
    activeUsers: { value: string; change: string; trend: string }
    pendingPayouts: { value: string; change: string; trend: string }
  }
  transactions: TransactionData[]
  monthlyRevenue: MonthlyRevenue[]
  expenseBreakdown: ExpenseBreakdown[]
  recentTransactions: Transaction[]
}
