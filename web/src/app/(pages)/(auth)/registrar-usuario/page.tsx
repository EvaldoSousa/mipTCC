'use client'
import BaseForm from '@/core/components/form/BaseForm'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Failure from '@/core/failure'
import { InputForm } from '@/core/components/form/Input'
import ButtonForm from '@/core/components/form/ButtonForm'
import { ToastContainer, toast } from 'react-toastify'
import { registrarUsuario } from './functions'
import Link from 'next/link'
import { Checkbox } from '@/core/components/form/checkbox'

const RegistrarUsuario = () => {
  const [carregando, setCarregando] = useState<boolean>(false)

  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    nomeusuario: '',
    senha: '',
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setForm((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    await registrarUsuario(form)
      .then((_) => toast('Usuário cadastrado', { type: 'success' }))
      .catch((error: Failure) => toast(error.message, { type: 'error' }))
    setCarregando(false)
  }

  return (
    <BaseForm
      titulo="Cadastro de Usuário"
      subtitulo="Cadastrar novo usuário para o sistema"
      carregando={false}
    >
      <form
        className="flex flex-col mt-0	pb-8 gap-4 sm:w-1/3"
        onSubmit={onSubmit}
      >
        <InputForm.Root>
          <InputForm.Title id="nome" titulo="Nome" />
          <InputForm.Content
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </InputForm.Root>
        <InputForm.Root>
          <InputForm.Title id="sobrenome" titulo="Sobrenome" />
          <InputForm.Content
            type="text"
            id="sobrenome"
            name="sobrenome"
            placeholder="Sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
            required
          />
        </InputForm.Root>
        <InputForm.Root>
          <InputForm.Title id="email" titulo="E-mail" />
          <InputForm.Content
            type="email"
            id="email"
            name="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </InputForm.Root>
        <InputForm.Root>
          <InputForm.Title id="nomeusuario" titulo="Nome de usuário" />
          <InputForm.Content
            type="text"
            id="nomeusuario"
            name="nomeusuario"
            placeholder="Usuário"
            value={form.nomeusuario}
            onChange={handleChange}
            required
          />
        </InputForm.Root>
        <InputForm.Root>
          <InputForm.Title id="senha" titulo="Senha" />
          <InputForm.Content
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
            className="mb-10"
          />
        </InputForm.Root>

        <InputForm.Root>
          <InputForm.Title id="confirmar_nova_senha" titulo="Confirmar senha" />
          <InputForm.Content
            type="password"
            id="confirmar_senha"
            name="confirmar_senha"
            placeholder="Confirmar Senha"
            required
          />
        </InputForm.Root>
        <Checkbox value={false}>
          <span className="text-xs">
            Aceito e concordo com as {'  '}
            <Link
              href="/politicas-de-privacidade"
              className="text-xs text-green-800 hover:underline"
            >
              Politicas de Privacidade
            </Link>{' '}
            e{' '}
            <Link
              href="/termos-de-uso"
              className="text-xs text-green-800 hover:underline"
            >
              Termos de Uso.
            </Link>
          </span>
        </Checkbox>

        <ButtonForm titulo="Cadastrar" carregando={carregando} />
      </form>
      <ToastContainer />
    </BaseForm>
  )
}
export default RegistrarUsuario
