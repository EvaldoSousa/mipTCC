import Failure from '@/core/failure'

const url = process.env.HOST_API

const recuperarSenha = async (email: string) => {
  await fetch(`${url}/api/auth/recuperar-senha`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then(async (response) => {
      const json = await response.json()
      if (response.status !== 201) {
        throw new Failure(json.error)
      }
    })
    .catch((error) => {
      throw new Failure(error.toString())
    })
}

export { recuperarSenha }
