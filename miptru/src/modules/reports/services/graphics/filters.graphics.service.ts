import { Injectable } from "@nestjs/common";
import { Filtro } from "../../intities/filtros";
import { InjectModel } from "@nestjs/mongoose";
import { ano } from "schemas/ano.schema";
import { Model } from "mongoose";
import { municipio_destinatario } from "schemas/municipio_destinatrio.schema";
import { municipio_emissor } from "schemas/municipio_emissor.schema";
import { ncm_produto } from "schemas/ncm_produto.schema";

@Injectable()
export class FiltersGraphicsService {
  constructor(
    @InjectModel(ano.name)
    private anoModel: Model<ano>,
    @InjectModel(municipio_destinatario.name)
    private municipioDestinatarioModel: Model<municipio_destinatario>,
    @InjectModel(municipio_emissor.name)
    private municipioEmissorModel: Model<municipio_emissor>,
    @InjectModel(ncm_produto.name)
    private ncmProdutoModel: Model<ncm_produto>
  ) {}
  buscarFiltrosGraficoArvore = async (query: any) => {
    const filtros: Array<Filtro> = [];
    await this.anoModel.find().then((opcoes) => {
      filtros.push({
        ordem: 1,
        codigo: "ano",
        descricao: "Ano",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.ano}`,
            descricao: `${opcao.ano}`,
          };
        }),
        selecionados: [],
      });
    });
    if (query.agrupamento === "municipio_emissor")
      await this.municipioEmissorModel.find().then((opcoes) => {
        filtros.push({
          ordem: 2,
          codigo: "municipio_emissor",
          descricao: "Munícipio Emissor",
          opcoes: opcoes.map((opcao) => {
            return {
              codigo: `${opcao.municipio_emissor}`,
              descricao: `${opcao.municipio_emissor}`,
            };
          }),
          selecionados: [],
        });
      });

    if (query.agrupamento === "municipio_destinatario")
      await this.municipioDestinatarioModel.find().then((opcoes) => {
        filtros.push({
          ordem: 3,
          codigo: "municipio_destinatario",
          descricao: "Munícipio Destinatario",
          opcoes: opcoes.map((opcao) => {
            return {
              codigo: `${opcao.municipio_destinatario}`,
              descricao: `${opcao.municipio_destinatario}`,
            };
          }),
          selecionados: [],
        });
      });

    await this.ncmProdutoModel.find().then((opcoes) => {
      filtros.push({
        ordem: 4,
        codigo: "ncm_produto",
        descricao: "NCM Produto",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.ncm_produto}`,
            descricao: `${opcao.ncm_produto_desc}`,
          };
        }),
        selecionados: [],
      });
    });
    return {
      data: filtros,
    };
  };
}
