import { NextResponse } from 'next/server'

function generateTransactionData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map(day => ({
    day,
    income: Math.floor(Math.random() * 30000) + 40000,
    expenses: Math.floor(Math.random() * 25000) + 35000,
    profit: Math.floor(Math.random() * 15000) + 10000,
  }))
}

function generateRecentActivity() {
  const activities = [
    { type: 'income', description: 'Payment received', amount: '+$2,450', user: 'Sarah Mitchell' },
    { type: 'expense', description: 'Office supplies', amount: '-$340', user: 'James Chen' },
    { type: 'income', description: 'Subscription fee', amount: '+$890', user: 'Maria Garcia' },
    { type: 'expense', description: 'Cloud services', amount: '-$1,200', user: 'Emma Wilson' },
  ]
  
  return activities.map((activity, idx) => ({
    ...activity,
    id: `activity_${idx}`,
    time: `${Math.floor(Math.random() * 60) + 1}m ago`,
    status: 'completed',
  }))
}

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    const data = {
      kpis: {
        totalRevenue: { value: '$1.2M', change: '+12.5%', trend: 'up' },
        transactionsPerHour: { value: '3,847', change: '+8.2%', trend: 'up' },
        activeUsers: { value: '2,456', change: '+15.3%', trend: 'up' },
        pendingPayouts: { value: '$145K', change: '-3.1%', trend: 'down' },
      },
      transactions: generateTransactionData(),
      monthlyRevenue: [
        { month: 'Jan', revenue: 45000, target: 50000 },
        { month: 'Feb', revenue: 52000, target: 50000 },
        { month: 'Mar', revenue: 48000, target: 50000 },
        { month: 'Apr', revenue: 61000, target: 55000 },
        { month: 'May', revenue: 55000, target: 55000 },
        { month: 'Jun', revenue: 67000, target: 60000 },
      ],
      expenseBreakdown: [
        { name: 'Operations', value: 35, color: '#06b6d4' },
        { name: 'Payroll', value: 30, color: '#8b5cf6' },
        { name: 'Marketing', value: 20, color: '#f59e0b' },
        { name: 'Technology', value: 15, color: '#10b981' },
      ],
      recentTransactions: generateRecentActivity(),
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch overview data' },
      { status: 500 }
    )
  }
}