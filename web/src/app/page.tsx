'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Failure from '@/core/failure'
import { InputForm } from '@/core/components/form/Input'
import ButtonForm from '@/core/components/form/ButtonForm'
import Image from 'next/image'

const LoginPage = () => {
  const router = useRouter()
  const { status } = useSession()
  const [carregando, setCarregando] = useState(false)
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  const handleLogin = async (event: FormEvent) => {
    setCarregando(true)
    event.preventDefault()
    await signIn('credentials', {
      username: loginForm.username,
      password: loginForm.password,
      redirect: false,
    })
      .then((response) => {
        if (response?.error) {
          toast(response.error, { type: 'error' })
        } else {
          router.replace('/gerar-csv')
        }
      })
      .catch((error: Failure) => toast(error.message, { type: 'error' }))
    setCarregando(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setLoginForm((prev) => {
      return { ...prev, [name]: value }
    })
  }

  useEffect(() => {
    if (status === 'authenticated') {
      return router.push('/gerar-csv')
    }
  }, [status, router])

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="flex lg:justify-between justify-center items-center h-[700px] p-8 w-full max-w-screen-xl">
        <div className="hidden lg:flex flex-col justify-end bg-[url('/images/logo_fnf.svg')] bg-cover bg-center h-full w-1/2 rounded-md opacity-95">
          <div className="flex items-center gap-2 mt-2 self-center">
            <a
              href="https://lacam.unifesspa.edu.br/"
              target="_blank"
              rel="noreferrer"
              className="flex gap-2"
            >
              <Image
                width={30}
                height={30}
                src="images/logo_lacam_re.svg"
                alt="Logo LACAM"
              />
              <h2 className="text-xs font-extralight">
                Laboratório de Contas Regionais da Amazônia
              </h2>
            </a>

            <span className="text-xs font-extralight">@ 2023</span>
          </div>
        </div>
        <div className="flex flex-col w-1/2 justify-evenly h-full items-center ">
          <div className="flex flex-col max-w-md gap-4">
            <form className="flex flex-col gap-6 p-6" onSubmit={handleLogin}>
              <div className="flex flex-col self-center gap-1">
                <span className="text-3xl font-extralight whitespace-nowrap">
                  Filtro de Notas Fiscais T.R.U
                </span>
              </div>

              <InputForm.Root>
                <InputForm.Title id="nova_senha" titulo="Usuário" />
                <InputForm.Content
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Usuário"
                  value={loginForm.username}
                  onChange={handleChange}
                  required
                />
              </InputForm.Root>
              <div>
                <InputForm.Root>
                  <InputForm.Title id="password" titulo="Senha" />
                  <InputForm.Content
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Senha"
                    value={loginForm.password}
                    onChange={handleChange}
                    required
                  />
                </InputForm.Root>
                <Link
                  href="/recuperar-senha"
                  className="font-medium text-sm text-green-800 hover:underline  flex justify-end"
                >
                  Recuperar senha
                </Link>
              </div>
              <span className="text-xs">
                Ao acessar o app você concorda com as {'  '}
                <Link
                  href="/politicas-de-privacidade"
                  className="text-xs text-green-800 hover:underline"
                >
                  Politicas de Privacidade{' '}
                </Link>
                e{' '}
                <Link
                  href="/termos-de-uso"
                  className="text-xs text-green-800 hover:underline"
                >
                  Termos de Uso.
                </Link>
              </span>

              <ButtonForm titulo="Entrar" carregando={carregando} />

              <hr />

              <p className="font-medium text-sm flex justify-center">
                Não possui conta?
                <Link
                  href="/registrar-usuario"
                  className=" text-green-800 hover:underline mx-1"
                >
                  Registre-se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
export default LoginPage
