'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { recuperarSenha } from './functions'
import Failure from '@/core/failure'
import { InputForm } from '@/core/components/form/Input'
import ButtonForm from '@/core/components/form/ButtonForm'

const RecuperarSenhaPage = () => {
  const [email, setEmail] = useState<string>('')
  const [carregando, setCarregando] = useState<boolean>(false)

  const handleRecuperar = async (event: FormEvent) => {
    setCarregando(true)
    event.preventDefault()
    await recuperarSenha(email)
      .then(() => {
        toast('Verifique sua caixa de E-mails', { type: 'success' })
      })
      .catch((error: Failure) => toast(error.message, { type: 'error' }))
    setCarregando(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form className="grid gap-6 self-center w-1/3" onSubmit={handleRecuperar}>
        <div>
          <span className="self-center text-xl font-semibold">
            Recuperar Senha
          </span>
          <h3></h3>
          <h2 className="self-center text-sm font-light">
            Informe o e-mail cadastrado na plataforma. Enviaremos um link para
            você redefinir uma nova senha
          </h2>
        </div>
        <InputForm.Root>
          <InputForm.Title id="nova_senha" titulo="E-mail" />
          <InputForm.Content
            type="email"
            id="email"
            name="email"
            placeholder="seu@email.com"
            value={email}
            onChange={handleChange}
            required
          />
        </InputForm.Root>

        <ButtonForm titulo="Recuperar senha" carregando={carregando} />
      </form>

      <ToastContainer />
    </div>
  )
}
export default RecuperarSenhaPage
