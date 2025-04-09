'use client'
import React, { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { buscarFiltrosRepo, downloadFileRepo } from './functions'
import { Filtro, Opcao } from '@/core/filtros'
import Loading from '@/core/components/Loading'
import Failure from '@/core/failure'
import { ToastContainer, toast } from 'react-toastify'
import Gerar from '@/core/components/ButtonGerar'
import useSocket from '@/integrations/socket'
export default function GerarCSVPage() {
  const socket = useSocket()
  const [carrerando, setCarregando] = useState<boolean>(true)
  const [gerando, setGerando] = useState<boolean>(false)
  const [filtros, setFiltros] = useState<Array<Filtro>>([])
  const [agrupamento, setAgrupamento] = useState<Opcao>({
    codigo: '',
    descricao: 'Não agrupar',
  })
  const [colunas, setColunas] = useState<Array<Opcao>>([])
  const [agrupamentosOpcoes, setAgrupamentosOpcoes] = useState<Array<Opcao>>([])
  const [colunasOpcoes, setColunasOpcoes] = useState<Array<Opcao>>([])

  const buscarFiltros = async () => {
    await buscarFiltrosRepo()
      .then((response) => {
        setFiltros(response.filtros)
        setAgrupamentosOpcoes(response.agrupamentos)
        setColunasOpcoes(response.colunas)
      })
      .catch((error: Failure) => toast(error.message, { type: 'error' }))
    setCarregando(false)
  }

  useEffect(() => {
    setCarregando(true)
    buscarFiltros()
  }, [])

  useEffect(() => {
    socket.on('csv', (data: any) => {
      download()
    })
    socket.on('error', (data: any) => {
      setGerando(false)
      setCarregando(false)
      toast(data.message, { type: 'error' })
    })
    socket.on('process', (data) => {
      setGerando(true)
      toast(data.message, { type: 'info' })
    })
  }, [socket])

  const download = async () => {
    await downloadFileRepo()
      .then((response) => {
        const element = document.createElement('a')
        const file = new Blob([response], {
          type: 'text/csv',
        })
        element.href = URL.createObjectURL(file)
        element.download = 'tabela.csv'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
        toast('Relatório gerado!', { type: 'success' })
      })
      .catch((error: Failure) => {
        toast(error.message.replaceAll('FailureError:', ''), { type: 'error' })
      })
      .finally(() => {
        setGerando(false)
        setCarregando(false)
      })
  }

  const handleChange = (selecionados: MultiValue<Opcao>, index: number) => {
    const updatedFiltros = [...filtros]
    updatedFiltros[index].selecionados = selecionados.map((opcao) => opcao)
    setFiltros(updatedFiltros)
  }
  return (
    <div className="flex flex-col justify-center items-center p-4 mt-14">
      <div className="flex flex-col w-full max-w-screen-xl">
        <div id="formTitulo" className="mb-6">
          <h4 className="text-lg">Gerar CSV</h4>
          <h6 className="text-sm">Parametrize e gere seu csv</h6>
        </div>
        {carrerando ? (
          <Loading />
        ) : (
          <>
            <h4 className="text-lg font-light">Parametros</h4>
            <div id="formFiltros" className="grid sm:grid-cols-3 gap-6 mb-6">
              {filtros.map((filtro, index) => {
                return (
                  <div key={index}>
                    <label className="block mb-1 text-sm font-medium text-gray-900">
                      {filtro.descricao}
                    </label>
                    <Select
                      id={filtro.codigo}
                      isMulti={true}
                      closeMenuOnSelect={false}
                      options={filtro.opcoes}
                      value={filtro.selecionados}
                      onChange={(newValue, _) => handleChange(newValue, index)}
                      placeholder="Selecione"
                      getOptionLabel={(opcao) => {
                        if (opcao.descricao === '') {
                          return opcao.codigo
                        } else {
                          return `${opcao.codigo} - ${opcao.descricao}`
                        }
                      }}
                      getOptionValue={(opcao) => opcao.codigo}
                      className="z-1"
                    />
                  </div>
                )
              })}
            </div>

            <hr className="mb-3 mt-4" />
            <div id="formAcoes" className="flex flex-col mt-6">
              <div className=" grid sm:grid-cols-3 gap-4">
                <div id="formAgrupamentos" className="flex flex-col mb-6">
                  <label className="text-sm font-medium text-gray-900">
                    Agrupamento
                  </label>
                  <span className="mb-1 text-xs font-light text-gray-900">
                    Se precisar, utilize para melhorar a visualização dos dados
                  </span>
                  <Select
                    id="agrupamento"
                    isMulti={false}
                    options={agrupamentosOpcoes}
                    onChange={(newValue, _) => {
                      if (newValue !== null) {
                        setAgrupamento({
                          codigo: newValue.codigo,
                          descricao: newValue.descricao,
                        })
                        setColunas([])
                      }
                    }}
                    value={agrupamento}
                    placeholder="Selecione"
                    getOptionLabel={(opcao) => opcao.descricao}
                    getOptionValue={(opcao) => opcao.codigo}
                  />
                </div>
                <div id="formColunas" className="flex flex-col mb-6">
                  <label className="text-sm font-medium text-gray-900">
                    Colunas Visíveis
                  </label>
                  <span className="mb-1 text-xs font-light text-gray-900">
                    Deixe em branco se quiser exibir todas as colunas
                  </span>
                  <Select
                    id="colunas"
                    isMulti={true}
                    closeMenuOnSelect={false}
                    options={colunasOpcoes}
                    onChange={(newValue, _) => {
                      if (newValue !== null) {
                        setColunas(
                          newValue.map((value) => {
                            return {
                              codigo: value.codigo,
                              descricao: value.descricao,
                            }
                          }),
                        )
                        setAgrupamento({ codigo: '', descricao: 'Não agrupar' })
                      }
                    }}
                    value={colunas}
                    placeholder="Selecione"
                    getOptionLabel={(opcao) => opcao.descricao}
                    getOptionValue={(opcao) => opcao.codigo}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <Gerar
          onClick={async () => {
            if (gerando || carrerando) {
              return
            }

            const filtro = filtros
              .filter((value, _) => {
                return value.selecionados.length > 0
              })
              .map((value) => {
                return {
                  codigo: value.codigo,
                  selecionados: value.selecionados,
                }
              })
            socket.emit('gerar-csv', {
              filtros: filtro,
              agrupamento,
              colunas,
            })
          }}
          texto="Gerando Relatório"
          gerandoCSV={gerando}
        />
        <ToastContainer />
      </div>
    </div>
  )
}
