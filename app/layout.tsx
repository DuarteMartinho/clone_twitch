import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Toaster } from 'sonner'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitch Clone',
  description: 'Web Application for streaming content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            forcedTheme='dark'
            storageKey='twitch-clone-theme'
          >
            <Toaster
              theme='light'
              position='bottom-center'
              richColors
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
