import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 300))

    const fraudStats = {
      distribution: [
        { name: 'Legitimate', value: 94.2, color: '#10b981' },
        { name: 'Suspicious', value: 4.3, color: '#f59e0b' },
        { name: 'Confirmed Fraud', value: 1.5, color: '#ef4444' },
      ],
      trends: {
        thisWeek: { legitimate: 94.2, suspicious: 4.3, fraud: 1.5 },
        lastWeek: { legitimate: 93.8, suspicious: 4.7, fraud: 1.5 },
      },
      totalTransactions: 125847,
      flaggedTransactions: 7612,
      confirmedFraud: 1888,
    }

    return NextResponse.json({
      success: true,
      data: fraudStats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch fraud statistics' },
      { status: 500 }
    )
  }
}
