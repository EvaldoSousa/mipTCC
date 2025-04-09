'use client'
import React, { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { buscarAgrupamentosRepo, buscarFiltrosRepo } from './functions'
import { Filtro, Opcao } from '@/core/filtros'
import Loading from '@/core/components/Loading'
import GraficoArvore from '@/core/components/GraficoArvore'
import useSocket from '@/integrations/socket'
import { ToastContainer, toast } from 'react-toastify'
import Gerar from '@/core/components/ButtonGerar'
import Failure from '@/core/failure'

const GerarGraficoArvorePage = () => {
  const socket = useSocket()
  const [carrerando, setCarregando] = useState<boolean>(true)
  const [gerando, setGerando] = useState<boolean>(false)
  const [filtros, setFiltros] = useState<Array<Filtro>>([])
  const [dados, setDados] = useState([])
  const [agrupamentosOpcoes, setAgrupamentosOpcoes] = useState<Array<Opcao>>([])
  const [agrupamento, setAgrupamento] = useState<Opcao>({
    codigo: 'municipio_emissor',
    descricao: 'Município Emissor',
  })

  const buscarFiltros = async () => {
    await buscarFiltrosRepo()
      .then((response) => {
        setFiltros(response)
      })
      .catch((error: Failure) => toast(error.message, { type: 'error' }))
  }

  const buscarAgrupamentosOpcoes = () => {
    const response = buscarAgrupamentosRepo()
    setAgrupamentosOpcoes(response)
  }

  useEffect(() => {
    setCarregando(true)
    buscarFiltros()
    buscarAgrupamentosOpcoes()
    setCarregando(false)
  }, [])

  useEffect(() => {
    socket.on(`onGraficoArvore`, (data: any) => {
      const dados = data.data.map((value: any) => {
        return {
          x: Object.values(value)[0],
          y: Object.values(value)[1],
        }
      })
      console.log('onGraficoArvore:', socket.id)
      toast('Gráfico gerado', { type: 'success' })
      setGerando(false)
      setDados(dados)
      setCarregando(false)
    })
    socket.on('error', (data: any) => {
      setGerando(false)
      setCarregando(false)
      toast(data.message, { type: 'error' })
    })
    socket.on('process', (data: any) => {
      setGerando(true)
      console.log('process:', socket.id)
      toast(data.message, { type: 'info' })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  const handleChange = (selecionados: MultiValue<Opcao>, index: number) => {
    const updatedFiltros = [...filtros]
    updatedFiltros[index].selecionados = selecionados.map((opcao) => opcao)
    setFiltros(updatedFiltros)
  }
  return (
    <div className="flex flex-col justify-center items-center p-4 mt-14">
      <div className="flex flex-col w-full max-w-screen-xl">
        <div id="formTitulo" className="fixed mb-6 bg-white">
          <h4 className="text-lg">Gerar Gráfico de Árvore</h4>
          <h6 className="text-sm">Parametrize e gere seu gráfico</h6>
        </div>
        {carrerando ? (
          <Loading />
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              id="idOpcoes"
              className="flex flex-col mb-6 sm:w-1/4 overflow-y-visible mt-14"
            >
              <label
                htmlFor="agrupamento"
                className="text-sm font-medium text-gray-900"
              >
                Agrupamento
              </label>
              <span className="mb-1 text-xs font-light text-gray-900">
                Selecione o agrupamento para gerar o gráfico de árvore
              </span>
              <Select
                id="agrupamento"
                menuPosition="fixed"
                isMulti={false}
                options={agrupamentosOpcoes}
                onChange={(newValue, _) => {
                  if (newValue !== null) {
                    setAgrupamento({
                      codigo: newValue.codigo,
                      descricao: newValue.descricao,
                    })
                  }
                }}
                value={agrupamento}
                placeholder="Todos"
                getOptionLabel={(opcao) => opcao.descricao}
                getOptionValue={(opcao) => opcao.codigo}
              />
              <hr className="mb-4 mt-6" />
              <h4 className="text-base font-light">Filtros</h4>
              <div id="formFiltros" className="grid sm:grid-cols-1 gap-4 mb-6">
                {filtros.map((filtro, index) => {
                  return (
                    <div key={index}>
                      <label
                        htmlFor={filtro.codigo}
                        className="block mb-1 text-sm font-medium text-gray-900"
                      >
                        {filtro.descricao}
                      </label>
                      <Select
                        id={filtro.codigo}
                        isMulti={true}
                        options={filtro.opcoes}
                        value={filtro.selecionados}
                        onChange={(newValue, _) =>
                          handleChange(newValue, index)
                        }
                        placeholder="Todos"
                        getOptionLabel={(opcao) => opcao.descricao}
                        getOptionValue={(opcao) => opcao.codigo}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="sm:w-3/4 h-full">
              <GraficoArvore series={dados} />
            </div>
          </div>
        )}

        <Gerar
          texto="Gerando Gráfico de Árvore"
          gerandoCSV={gerando}
          onClick={async () => {
            try {
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
              socket.emit('gerar-grafico-arvore', {
                filtros: filtro,
                agrupamento,
              })
            } catch (error) {
              console.log(error)
            }
          }}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
export default GerarGraficoArvorePage
