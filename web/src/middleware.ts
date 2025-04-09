export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/gerar-csv/:path*', '/gerar-grafico-arvore/:path*'],
}
