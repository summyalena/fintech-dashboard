import { NextResponse } from 'next/server'

function generateRiskAlerts() {
  const types = [
    'High Value Transfer',
    'Multiple Failed Logins',
    'Unusual Location',
    'Rapid Transactions',
    'Suspicious Pattern',
    'Account Takeover Attempt'
  ]
  const users = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson', 'Diana Martinez']
  const risks: Array<'High' | 'Medium'> = ['High', 'Medium']
  
  return types.map((type, idx) => ({
    id: `ALT-${String(idx + 1).padStart(3, '0')}`,
    type,
    user: users[idx % users.length],
    amount: type === 'High Value Transfer' ? `$${(Math.random() * 50000 + 50000).toFixed(0)}` : undefined,
    attempts: type.includes('Login') ? Math.floor(Math.random() * 15 + 5) : undefined,
    location: type.includes('Location') ? ['Nigeria', 'Russia', 'China'][Math.floor(Math.random() * 3)] : undefined,
    count: type.includes('Rapid') ? `${Math.floor(Math.random() * 10 + 5)} in 2min` : undefined,
    risk: risks[idx % 2],
    time: `${Math.floor(Math.random() * 60) + 1}m ago`,
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    resolved: false,
  }))
}

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 400))

    const alerts = generateRiskAlerts()

    return NextResponse.json({
      success: true,
      data: alerts,
      total: alerts.length,
      unresolved: alerts.filter(a => !a.resolved).length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch risk alerts' },
      { status: 500 }
    )
  }
}