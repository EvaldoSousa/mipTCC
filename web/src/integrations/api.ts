import Failure from '@/core/failure'
import { getSession, signOut } from 'next-auth/react'

interface ApiPost {
  url: string
  body: any
}
interface ApiGet {
  url: string
}
const apiPost = async (props: ApiPost) => {
  const session = await getSession()
  const token = session?.user.accessToken
  const header = getHeaders(token)
  return await fetch(props.url, {
    method: 'POST',
    headers: {
      ...header,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props.body),
  })
    .then(async (value: Response) => {
      const json = await value.json()
      if (value.status === 200 || value.status === 201) {
        return value
      }
      if (value.status === 401) {
        signOut({ callbackUrl: '/' })
      }
      throw new Failure(json.message)
    })
    .catch(async (error: any) => {
      throw new Failure(error.toString())
    })
}

const apiGet = async (props: ApiGet) => {
  const session = await getSession()
  const token = session?.user.accessToken
  return await fetch(props.url, {
    headers: getHeaders(token),
  })
    .then(async (value: Response) => {
      const json = await value.json()
      if (value.status === 200) {
        return json
      }
      if (value.status === 401) {
        signOut({ callbackUrl: '/' })
      }
      throw new Failure(json.message)
    })
    .catch(async (response: any) => {
      throw new Failure(response.toString())
    })
}

const apiDownload = async (props: ApiGet) => {
  const session = await getSession()
  const token = session?.user.accessToken
  return await fetch(props.url, {
    headers: getHeaders(token),
  })
    .then(async (response: Response) => {
      if (response.status === 200) {
        return await response.blob()
      }
      if (response.status === 401) {
        signOut({ callbackUrl: '/' })
      }
      const json = await response.json()
      throw new Failure(json.message)
    })
    .catch(async (response: any) => {
      throw new Failure(response.toString())
    })
}

const getHeaders = (token: String | undefined) => {
  if (process.env.NODE_ENV === 'development') {
    const headers = {
      authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    }
    return headers
  } else {
    const headers = {
      authorization: `Bearer ${token}`,
    }
    return headers
  }
}

export { apiPost, apiGet, apiDownload }
