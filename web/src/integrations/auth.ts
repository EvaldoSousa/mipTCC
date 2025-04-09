import Failure from '@/core/failure'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const url = process.env.HOST_API

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _) {
        try {
          const response = await fetch(`${url}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          })
          const json = await response.json()
          if (response.status === 201) {
            return json
          } else {
            throw new Failure(json.message)
          }
        } catch (error: any) {
          console.log(error)
          throw new Failure(error)
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
}
export { authOptions }
