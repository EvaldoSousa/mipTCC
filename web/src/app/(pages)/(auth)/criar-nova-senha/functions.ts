import Failure from '@/core/failure'

const url = process.env.HOST_API

const cadastrarNovaSenha = async (token: string, senha: string) => {
  const body = JSON.stringify({ token, senha })
  await fetch(`${url}/api/auth/criar-nova-senha`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(async (response) => {
      const json = await response.json()
      if (response.status !== 201) {
        throw new Failure(json.error)
      }
    })
    .catch(async (error) => {
      throw new Failure(error)
    })
}

export { cadastrarNovaSenha }
