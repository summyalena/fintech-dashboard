import { NextRequest, NextResponse } from 'next/server'

function generateUsers() {
  const names = [
    'Sarah Mitchell', 'James Chen', 'Maria Garcia', 'David Park',
    'Emma Wilson', 'Michael Brown', 'Lisa Anderson', 'Robert Lee'
  ]
  const statuses: Array<'Active' | 'KYC Pending' | 'Locked'> = ['Active', 'Active', 'Active', 'KYC Pending', 'Locked']
  
  return names.map((name, idx) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    return {
      id: `USR-${String(idx + 1).padStart(3, '0')}`,
      name,
      email: name.toLowerCase().replace(' ', '.') + '@email.com',
      status,
      kyc: status === 'KYC Pending' ? 'Pending' as const : 'Verified' as const,
      balance: `$${(Math.random() * 50000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      lastActive: ['2m ago', '15m ago', '1h ago', '3d ago', '5m ago'][Math.floor(Math.random() * 5)],
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }
  })
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    await new Promise(resolve => setTimeout(resolve, 400))

    let users = generateUsers()

    if (status && status !== 'All') {
      users = users.filter(user => user.status === status)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      users = users.filter(
        user =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({
      success: true,
      data: users,
      total: users.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}