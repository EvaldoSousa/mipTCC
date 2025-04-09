/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id: bigint
      name: string
      email: string
      accessToken: string
      perfil: number
    }
  }
}
