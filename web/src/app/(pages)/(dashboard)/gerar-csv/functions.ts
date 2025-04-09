import { Filtro, Opcao } from '@/core/filtros'
import { apiDownload, apiGet } from '@/integrations/api'
const hostUrl = process.env.HOST_API

const buscarFiltrosRepo = async () => {
  const url = `${hostUrl}/api/dados/filtros`
  const filtros: Array<Filtro> = []
  const agrupamentos: Array<Opcao> = []
  const colunas: Array<Opcao> = []
  const json: any = await apiGet({
    url,
  })
  json.filtros?.forEach((value: Filtro) => {
    filtros.push(value)
  })
  json.agrupamentos?.forEach((value: Opcao) => {
    agrupamentos.push(value)
  })
  json.colunas?.forEach((value: Opcao) => {
    colunas.push(value)
  })
  return { filtros, agrupamentos, colunas }
}

const downloadFileRepo = async () => {
  const url = `${hostUrl}/api/dados/download`
  const file: any = await apiDownload({ url })
  return file
}

export { buscarFiltrosRepo, downloadFileRepo }
