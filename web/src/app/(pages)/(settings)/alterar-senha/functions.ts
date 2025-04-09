import { apiPost } from '@/integrations/api'
import { getSession } from 'next-auth/react'

const url = process.env.HOST_API

const alterarSenha = async (senhaAtual: string, novaSenha: string) => {
  const session = await getSession()
  await apiPost({
    url: `${url}/api/auth/alterar-senha`,
    body: JSON.stringify({
      id_usuario: session?.user._id,
      nova_senha: novaSenha,
      senha_atual: senhaAtual,
    }),
  })
}

export { alterarSenha }
