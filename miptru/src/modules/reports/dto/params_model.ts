import { Filtro, Opcao } from '../intities/filtros';

export interface ParametrosModel {
  filtros: Filtro[];
  colunas: Opcao[];
  agrupamentos: Opcao[];
}
