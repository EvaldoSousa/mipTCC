import AuthProviders from '@/core/components/providers/AuthProviders'
import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FNF TRU | Login',
  description: 'Sistemas de Filtros de Notas Fiscais TRU',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt_br">
      <body className={inter.className}>
        <AuthProviders>{children}</AuthProviders>
      </body>
    </html>
  )
}
