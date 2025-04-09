'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { cadastrarNovaSenha } from './functions'
import { useRouter, useSearchParams } from 'next/navigation'
import Failure from '@/core/failure'
import { InputForm } from '@/core/components/form/Input'

const CadastrarNovaSenhaPage = () => {
  const params = useSearchParams()
  const router = useRouter()
  const [senha, setSenha] = useState<string>('')

  const handleCadastrarNovaSenha = async (event: FormEvent) => {
    if (typeof window === 'undefined') {
      return
    }
    event.preventDefault()
    const token = params.get('token')
    if (token) {
      await cadastrarNovaSenha(token, senha)
        .then(() => {
          toast('Nova Senha Cadastrada', { type: 'success' })
          router.push('/')
        })
        .catch((error: Failure) => toast(error.message, { type: 'error' }))
    } else {
      toast('Token inválido', { type: 'error' })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="grid gap-6 w-1/3" onSubmit={handleCadastrarNovaSenha}>
        <div>
          <span className="self-center text-xl font-semibold">
            Cadastrar Nova Senha
          </span>
          <h3></h3>
          <h2 className="self-center text-sm font-light">
            Cadastre uma nova senha
          </h2>
        </div>
        <InputForm.Root>
          <InputForm.Title id="nova_senha" titulo="Nova Senha" />
          <InputForm.Content
            type="password"
            id="nova_senha"
            name="nova_senha"
            placeholder="Nova Senha"
            value={senha}
            onChange={handleChange}
            required
          />
        </InputForm.Root>
        <InputForm.Root>
          <InputForm.Title id="nova_senha" titulo="Confirmar Senha" />
          <InputForm.Content
            type="password"
            id="nova_senha"
            name="nova_senha"
            placeholder="Confirmar Senha"
            value={senha}
            onChange={handleChange}
            required
          />
        </InputForm.Root>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Cadastrar
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}
export default CadastrarNovaSenhaPage
