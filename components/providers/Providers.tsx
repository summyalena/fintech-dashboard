'use client'

import { ThemeProvider } from '@/lib/theme'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {

  console.log('Providers component rendering')

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}