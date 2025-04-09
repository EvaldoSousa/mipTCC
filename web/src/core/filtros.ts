export interface Opcao {
  codigo: string
  descricao: string
}

export interface Filtro {
  ordem: number
  codigo: string
  descricao: string
  opcoes: Array<Opcao>
  selecionados: Array<Opcao>
}
