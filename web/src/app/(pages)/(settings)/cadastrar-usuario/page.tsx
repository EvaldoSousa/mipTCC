'use client'
import BaseForm from '@/core/components/form/BaseForm'
import ButtonForm from '@/core/components/form/ButtonForm'
import { InputForm } from '@/core/components/form/Input'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Select from 'react-select'
import { cadastrarUsuario } from './functions'
import { ToastContainer, toast } from 'react-toastify'
import Failure from '@/core/failure'

export default function CadastrarUsuarioPage() {
  const [carregando, setCarregando] = useState<boolean>(false)
  const opcoes = [
    { codigo: 0, descricao: 'Padrão' },
    { codigo: 1, descricao: 'Analista' },
    { codigo: 2, descricao: 'Administrador' },
  ]
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    nomeusuario: '',
    senha: '',
    perfil: 0,
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setForm((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const onSubmit = async (e: FormEvent) => {
    setCarregando(true)
    e.preventDefault()
    await cadastrarUsuario(form)
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
      <form className="flex flex-col gap-6 sm:w-1/3" onSubmit={onSubmit}>
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
          />
        </InputForm.Root>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900">
            Papel
          </label>
          <Select
            id="papel"
            options={opcoes}
            value={opcoes.find((value) => {
              return value.codigo === form.perfil
            })}
            onChange={(newValue, _) => {
              setForm((prev) => {
                return { ...prev, perfil: newValue?.codigo ?? 0 }
              })
            }}
            placeholder="Selecione"
            getOptionLabel={(opcao) => opcao.descricao}
            getOptionValue={(opcao) => opcao.codigo.toString()}
            className="z-0"
          />
        </div>
        <ButtonForm titulo="Cadastrar" carregando={carregando} />
      </form>
      <ToastContainer />
    </BaseForm>
  )
}
