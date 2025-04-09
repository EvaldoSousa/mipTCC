import React from 'react'
import App from '@/core/layouts/App'

export const metadata = {
  title: 'FNF TRU',
  description: 'Sistemas de Filtros de Notas Fiscais TRU',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt_br">
      <body>
        <App>{children}</App>
      </body>
    </html>
  )
}
