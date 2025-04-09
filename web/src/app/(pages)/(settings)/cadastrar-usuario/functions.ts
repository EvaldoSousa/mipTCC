import Failure from '@/core/failure'
import { apiPost } from '@/integrations/api'

const hostUrl = process.env.HOST_API
interface CadastrarUsuarioProps {
  nome: string
  sobrenome: string
  email: string
  nomeusuario: string
  senha: string
  perfil: number
}

const cadastrarUsuario = async (props: CadastrarUsuarioProps) => {
  try {
    await apiPost({
      url: `${hostUrl}/api/auth/user/create`,
      body: props,
    })
  } catch (error) {
    throw new Failure(error)
  }
}
export { cadastrarUsuario }
