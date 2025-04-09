import Failure from '@/core/failure'
import { apiPost } from '@/integrations/api'

const hostUrl = process.env.HOST_API
interface RegistrarUsuarioProps {
  nome: string
  sobrenome: string
  email: string
  nomeusuario: string
  senha: string
}

const registrarUsuario = async (props: RegistrarUsuarioProps) => {
  try {
    await apiPost({
      url: `${hostUrl}/api/auth/user/create-default`,
      body: props,
    })
  } catch (error) {
    throw new Failure(error)
  }
}

export { registrarUsuario }
