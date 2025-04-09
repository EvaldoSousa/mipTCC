import { Filtro, Opcao } from '@/core/filtros'
import { apiGet } from '@/integrations/api'
const url = process.env.HOST_API

const buscarFiltrosRepo = async () => {
  const filtros: Array<Filtro> = []
  const json = await apiGet({
    url: `${url}/api/dados/filtros-grafico-arvore`,
  })
  if (json.data?.length > 0) {
    json.data.forEach((filtro: Filtro) => {
      filtros.push(filtro)
    })
  }
  return filtros
}
const buscarAgrupamentosRepo = () => {
  const agrupamentos: Array<Opcao> = [
    {
      codigo: 'municipio_emissor',
      descricao: 'Município por Emissor',
    },
    {
      codigo: 'municipio_destinatario',
      descricao: 'Município  Destinatário',
    },
  ]
  return agrupamentos
}

export { buscarAgrupamentosRepo, buscarFiltrosRepo }
