const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },
}

export const dashboardAPI = {
  getOverview: async () => {
    return fetchAPI('/dashboard/overview')
  },
}

export const usersAPI = {
  getAll: async (params?: { status?: string; search?: string }) => {
    const queryString = new URLSearchParams(params as any).toString()
    return fetchAPI(`/users${queryString ? `?${queryString}` : ''}`)
  },
  
  getById: async (id: string) => {
    return fetchAPI(`/users/${id}`)
  },
  
  create: async (userData: { name: string; email: string }) => {
    return fetchAPI('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },
  
  update: async (id: string, userData: any) => {
    return fetchAPI(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    })
  },
  
  delete: async (id: string) => {
    return fetchAPI(`/users/${id}`, {
      method: 'DELETE',
    })
  },
}

export const riskAPI = {
  getAlerts: async () => {
    return fetchAPI('/risk/alerts')
  },
  
  getFraudStats: async () => {
    return fetchAPI('/risk/fraud-stats')
  },
}

export const analyticsAPI = {
  getTransactions: async (period: 'week' | 'month' | 'year' = 'week') => {
    return fetchAPI(`/analytics/transactions?period=${period}`)
  },
}
