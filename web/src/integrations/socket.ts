import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import io from 'socket.io-client'

const url = process.env.HOST_API ?? ''
const socket = io(url, {
  extraHeaders: {
    'ngrok-skip-browser-warning': 'true',
  },
})

const useSocket = () => {
  const { data: session } = useSession()
  const buscarToken = async () => {
    const token = session?.user?.accessToken
    socket.auth = { token }
    if (socket.disconnected) {
      socket.connect()
    }
    console.log('connected:', socket.id)
  }
  useEffect(() => {
    buscarToken()
    return () => {
      console.log('disconnect:', socket.id)
      socket.removeAllListeners()
      socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return socket
}

export default useSocket
