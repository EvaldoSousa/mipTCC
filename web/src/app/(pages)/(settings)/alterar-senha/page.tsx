'use client'

import BaseForm from '@/core/components/form/BaseForm'
import ButtonForm from '@/core/components/form/ButtonForm'
import { InputForm } from '@/core/components/form/Input'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { alterarSenha } from './functions'
import Failure from '@/core/failure'

const AlterarSenhaPage = () => {
  const [carregando, setCarregando] = useState<boolean>(false)
  const [form, setForm] = useState({
    senha_atual: '',
    nova_senha: '',
    confirmar_nova_senha: '',
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setForm((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const onSubmit = async (event: FormEvent) => {
    setCarregando(true)
    event.preventDefault()
    if (form.nova_senha !== form.confirmar_nova_senha) {
      toast('Confirme a Nova Senha', { type: 'warning' })
      return
    }
    await alterarSenha(form.senha_atual, form.nova_senha)
      .then((_) => toast('Senha alterada!', { type: 'success' }))
      .catch((response: Failure) => toast(response.message, { type: 'error' }))
    setCarregando(false)
  }

  return (
    <BaseForm
      carregando={false}
      titulo="Alterar Senha"
      subtitulo="É necessário saber a senha atual para definir uma nova senha"
    >
      <form className="flex flex-col gap-6 sm:w-1/3" onSubmit={onSubmit}>
        <InputForm.Root>
          <InputForm.Title id="senha_atual" titulo="Senha Atual" />
          <InputForm.Content
            type="password"
            id="senha_atual"
            name="senha_atual"
            placeholder="Senha Atual"
            value={form.senha_atual}
            onChange={handleChange}
            required
          />
        </InputForm.Root>
        <InputForm.Root>
          <InputForm.Title id="nova_senha" titulo="Nova Senha" />
          <InputForm.Content
            type="password"
            id="nova_senha"
            name="nova_senha"
            placeholder="Nova Senha"
            value={form.nova_senha}
            onChange={handleChange}
            required
          />
        </InputForm.Root>
        <InputForm.Root>
          <InputForm.Title
            id="confirmar_nova_senha"
            titulo="Confirmar Nova Senha"
          />
          <InputForm.Content
            type="password"
            id="confirmar_nova_senha"
            name="confirmar_nova_senha"
            placeholder="Confirmar Senha"
            value={form.confirmar_nova_senha}
            onChange={handleChange}
            required
          />
        </InputForm.Root>
        <ButtonForm titulo="Alterar Senha" carregando={carregando} />
      </form>
      <ToastContainer />
    </BaseForm>
  )
}

export default AlterarSenhaPage
