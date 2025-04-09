import { ParametrosModel } from "../../dto/params_model";
import { Injectable } from "@nestjs/common";
import { Filtro, Opcao } from "../../intities/filtros";
import { InjectModel } from "@nestjs/mongoose";
import { ano } from "schemas/ano.schema";
import { Model } from "mongoose";
import { cfop } from "schemas/cfop.schema";
import { cnae } from "schemas/cnae.schema";
import { cnae_classe_4d } from "schemas/cnae_classe_4d.schema";
import { cnae_classe_5d } from "schemas/cnae_classe_5d.schema";
import { cnae_divisao } from "schemas/cnae_divisao.schema";
import { cnae_grupo } from "schemas/cnae_grupo.schema";
import { municipio_destinatario_codigo } from "schemas/municipio_destinatario_codigo.schema";
import { municipio_destinatario } from "schemas/municipio_destinatrio.schema";
import { municipio_emissor_codigo } from "schemas/municipio_emissor_codigo.schema";
import { municipio_emissor } from "schemas/municipio_emissor.schema";
import { ncm_produto } from "schemas/ncm_produto.schema";
import { scn_produto } from "schemas/scn_produto.schema";
import { scr_2010_divulga } from "schemas/scr_2010_divulga.schema";
import { scr_2010_trabalho } from "schemas/scr_2010_trabalho.schema";
import { uf_destinatario } from "schemas/uf_destinatario.schema";
import { uf_emissor } from "schemas/uf_emissor.schema";

@Injectable()
export class FiltersCSVService {
  constructor(
    @InjectModel(ano.name)
    private anoModel: Model<ano>,
    @InjectModel(cfop.name)
    private cfopModel: Model<cfop>,
    @InjectModel(cnae.name)
    private cnaeModel: Model<cnae>,
    @InjectModel(cnae_classe_4d.name)
    private cnaeClasse4dModel: Model<cnae_classe_4d>,
    @InjectModel(cnae_classe_5d.name)
    private cnaeClasse5dModel: Model<cnae_classe_5d>,
    @InjectModel(cnae_divisao.name)
    private cnaeDivisaoModel: Model<cnae_divisao>,
    @InjectModel(cnae_grupo.name)
    private cnaeGrupoModel: Model<cnae_grupo>,
    @InjectModel(municipio_destinatario_codigo.name)
    private municipioDestinatarioCodigoModel: Model<municipio_destinatario_codigo>,
    @InjectModel(municipio_destinatario.name)
    private municipioDestinatarioModel: Model<municipio_destinatario>,
    @InjectModel(municipio_emissor_codigo.name)
    private municipioEmissorCodigoModel: Model<municipio_emissor_codigo>,
    @InjectModel(municipio_emissor.name)
    private municipioEmissorModel: Model<municipio_emissor>,
    @InjectModel(ncm_produto.name)
    private ncmProdutoModel: Model<ncm_produto>,
    @InjectModel(scn_produto.name)
    private scnProdutoModel: Model<scn_produto>,
    @InjectModel(scr_2010_divulga.name)
    private scr2010DivulgaModel: Model<scr_2010_divulga>,
    @InjectModel(scr_2010_trabalho.name)
    private scr2010TrabalhoModel: Model<scr_2010_trabalho>,
    @InjectModel(uf_destinatario.name)
    private ufDestinatarioModel: Model<uf_destinatario>,
    @InjectModel(uf_emissor.name)
    private ufEmissorModel: Model<uf_emissor>
  ) {}

  buscarParametros = async ({ perfil }: { perfil: number }) => {
    const data: ParametrosModel = {
      filtros: [],
      colunas: [],
      agrupamentos: [],
    };
    data.filtros = await this.buscarFiltros({ perfil });
    data.colunas = await this.buscarColunas({ perfil });
    data.agrupamentos = await this.buscarAgrupamentos({ perfil });
    data.filtros.sort(
      (a: any, b: any) => parseFloat(a.ordem) - parseFloat(b.ordem)
    );
    data.agrupamentos.sort(function (a: any, b: any) {
      if (a.descricao > b.descricao) {
        return 1;
      }
      if (a.descricao < b.descricao) {
        return -1;
      }
      return 0;
    });
    return data;
  };
  buscarFiltros = async ({ perfil }: { perfil: number }) => {
    let filtros: Array<Filtro> = [];
    switch (perfil) {
      case 0: {
        filtros = await this._filtros0();
        break;
      }
      case 1: {
        filtros = await this._filtros1();
        break;
      }
      case 2: {
        filtros = await this._filtros2();
        break;
      }
    }
    return filtros;
  };
  buscarAgrupamentos = async ({ perfil }: { perfil: number }) => {
    let agrupamentos: Array<Opcao> = [];
    switch (perfil) {
      case 0: {
        agrupamentos = await this._agrupamentos0();
        break;
      }
      case 1: {
        agrupamentos = await this._agrupamentos1();
        break;
      }
      case 2: {
        agrupamentos = await this._agrupamentos2();
        break;
      }
    }
    return agrupamentos;
  };

  buscarColunas = async ({ perfil }: { perfil: number }) => {
    let colunas: Array<Opcao> = [];
    switch (perfil) {
      case 0: {
        colunas = await this._colunas0();
        break;
      }
      case 1: {
        colunas = await this._colunas1();
        break;
      }
      case 2: {
        colunas = await this._colunas2();
        break;
      }
    }
    return colunas;
  };

  // Público
  _filtros0 = async () => {
    const filtros: Array<Filtro> = [];
    await this.anoModel.find().then((values) => {
      filtros.push({
        ordem: 1,
        codigo: "ano",
        descricao: "Ano",
        opcoes: values.map((opcao) => {
          return {
            codigo: `${opcao.ano}`,
            descricao: ``,
          };
        }),
        selecionados: [],
      });
    });
    await this.municipioEmissorModel.find().then((opcoes) => {
      filtros.push({
        ordem: 2,
        codigo: "municipio_emissor",
        descricao: "Munícipio Emissor",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.municipio_emissor}`,
            descricao: ``,
          };
        }),
        selecionados: [],
      });
    });
    await this.ufEmissorModel.find().then((opcoes) => {
      filtros.push({
        ordem: 3,
        codigo: "uf_emissor",
        descricao: "Estado Emissor",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.uf_emissor}`,
            descricao: ``,
          };
        }),
        selecionados: [],
      });
    });
    await this.municipioDestinatarioModel.find().then((opcoes) => {
      filtros.push({
        ordem: 4,
        codigo: "municipio_destinatario",
        descricao: "Munícipio Destinatario",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.municipio_destinatario}`,
            descricao: ``,
          };
        }),
        selecionados: [],
      });
    });
    await this.ufDestinatarioModel.find().then((opcoes) => {
      filtros.push({
        ordem: 5,
        codigo: "uf_destinatario",
        descricao: "Estado Destinatario",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.uf_destinatario}`,
            descricao: ``,
          };
        }),
        selecionados: [],
      });
    });
    await this.municipioEmissorCodigoModel.find().then((opcoes) => {
      filtros.push({
        ordem: 2.1,
        codigo: "municipio_emissor_codigo",
        descricao: "Munícipio Emissor Código",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: opcao.municipio_emissor_codigo,
            descricao: ``,
          };
        }),
        selecionados: [],
      });
    });
    await this.municipioDestinatarioCodigoModel.find().then((opcoes) => {
      filtros.push({
        ordem: 4.1,
        codigo: "municipio_destinatario_codigo",
        descricao: "Munícipio Destinatario Código",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: opcao.municipio_destinatario_codigo,
            descricao: ``,
          };
        }),
        selecionados: [],
      });
    });
    await this.cfopModel.find().then((opcoes) => {
      filtros.push({
        ordem: 6,
        codigo: "cfop",
        descricao: "CFOP",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.codigo}`,
            descricao: `${opcao.descricao}`,
          };
        }),
        selecionados: [],
      });
    });
    await this.scnProdutoModel.find().then((opcoes) => {
      filtros.push({
        ordem: 7,
        codigo: "scn_produto",
        descricao: "SCN Produto",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.scn_produto}`,
            descricao: `${opcao.scn_produto_desc}`,
          };
        }),
        selecionados: [],
      });
    });
    await this.cnaeDivisaoModel.find().then((opcoes) => {
      filtros.push({
        ordem: 9.1,
        codigo: "cnae_divisao",
        descricao: "CNAE Divisão",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.codigo}`,
            descricao: `${opcao.descricao}`,
          };
        }),
        selecionados: [],
      });
    });
    await this.scr2010TrabalhoModel.find().then((opcoes) => {
      filtros.push({
        ordem: 10,
        codigo: "scr_2010_trabalho",
        descricao: "SCR 2010 Trabalho",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.codigo}`,
            descricao: `${opcao.descricao}`,
          };
        }),
        selecionados: [],
      });
    });
    await this.scr2010DivulgaModel.find().then((opcoes) => {
      filtros.push({
        ordem: 11,
        codigo: "scr_2010_divulga",
        descricao: "SCR 2010 Divulga",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.codigo}`,
            descricao: `${opcao.descricao}`,
          };
        }),
        selecionados: [],
      });
    });

    return filtros;
  };
  _agrupamentos0 = async () => {
    const agrupamentos: Array<Opcao> = [
      {
        codigo: "",
        descricao: "Não agrupar",
      },
      {
        codigo: "municipio_emissor",
        descricao: "Município Emissor",
      },
      {
        codigo: "municipio_destinatario",
        descricao: "Município Destinatário",
      },
      {
        codigo: "cfop",
        descricao: "CFOP",
      },
      {
        codigo: "scn_produto",
        descricao: "SCN Produto",
      },
      {
        codigo: "cnae_divisao",
        descricao: "CNAE Divisão",
      },
    ];
    return agrupamentos;
  };
  _colunas0 = async () => {
    const colunas: Array<Opcao> = [
      {
        codigo: "ano",
        descricao: "Ano",
      },
      {
        codigo: "municipio_emissor",
        descricao: "Município Emissor",
      },
      {
        codigo: "uf_emissor",
        descricao: "Estado Emissor",
      },
      {
        codigo: "municipio_destinatario",
        descricao: "Munucípio Destinatário",
      },
      {
        codigo: "uf_destinatario",
        descricao: "Estado Destinatário",
      },
      {
        codigo: "municipio_emissor_codigo",
        descricao: "Município Emissor Código",
      },

      {
        codigo: "municipio_destinatario_codigo",
        descricao: "Munucípio Destinatário Código",
      },
      {
        codigo: "cfop",
        descricao: "CFOP",
      },
      {
        codigo: "desc_cfop",
        descricao: "CFOP Descrição",
      },
      {
        codigo: "scn_produto",
        descricao: "SCN Produto",
      },
      {
        codigo: "scn_produto_desc",
        descricao: "SCN Produto Descrição",
      },
      {
        codigo: "cnae_divisao",
        descricao: "CNAE Divisão",
      },
      {
        codigo: "cnae_divisao_desc",
        descricao: "CNAE Divisão Descrição",
      },
      {
        codigo: "scr_2010_trabalho",
        descricao: "SCR 2010 Trabalho",
      },
      {
        codigo: "scr_2010_trabalho_desc",
        descricao: "SCR 2010 Trabalho Descrição",
      },
      {
        codigo: "scr_2010_divulga",
        descricao: "SCR 2010 Divulga",
      },
      {
        codigo: "scr_2010_divulga_desc",
        descricao: "SCR 2010 Divulga Descrição",
      },
      {
        codigo: "total_bruto_produtos",
        descricao: "Total Bruto Produtos",
      },
    ];
    return colunas;
  };
  // Analista
  _filtros1 = async () => {
    const filtros: Array<Filtro> = [];
    const filtros0 = await this._filtros0();

    await this.cnaeGrupoModel.find().then((opcoes) => {
      filtros.push({
        ordem: 9.2,
        codigo: "cnae_grupo",
        descricao: "CNAE Grupo",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.codigo}`,
            descricao: `${opcao.descricao}`,
          };
        }),
        selecionados: [],
      });
    });
    await this.cnaeClasse4dModel.find().then((opcoes) => {
      filtros.push({
        ordem: 9.3,
        codigo: "cnae_classe_4d",
        descricao: "CNAE Classe 4D",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.codigo}`,
            descricao: `${opcao.descricao}`,
          };
        }),
        selecionados: [],
      });
    });
    await this.cnaeClasse5dModel.find().then((opcoes) => {
      filtros.push({
        ordem: 9.4,
        codigo: "cnae_classe_5d",
        descricao: "CNAE Classe 5D",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.codigo}`,
            descricao: `${opcao.descricao}`,
          };
        }),
        selecionados: [],
      });
    });
    return filtros.concat(filtros0);
  };
  _agrupamentos1 = async () => {
    const agrupamentos: Array<Opcao> = [
      {
        codigo: "cnae_grupo",
        descricao: "CNAE Grupo",
      },
      {
        codigo: "cnae_classe_4d",
        descricao: "CNAE Classe 4D",
      },
      {
        codigo: "cnae_classe_5d",
        descricao: "CNAE Classe 5D",
      },
    ];
    const agrupamentosO = await this._agrupamentos0();
    return agrupamentos.concat(agrupamentosO);
  };
  _colunas1 = async () => {
    const colunas: Array<Opcao> = [
      {
        codigo: "cnae_grupo",
        descricao: "CNAE Grupo",
      },
      {
        codigo: "cnae_grupo_desc",
        descricao: "CNAE Grupo Descrição",
      },
      {
        codigo: "cnae_classe_4d",
        descricao: "CNAE Classe 4D",
      },
      {
        codigo: "cnae_classe_4d_desc",
        descricao: "CNAE Classe 4D Descrição",
      },
      {
        codigo: "cnae_classe_5d",
        descricao: "CNAE Classe 5D",
      },
      {
        codigo: "cnae_classe_5d_desc",
        descricao: "CNAE Classe 5D Descrição",
      },
    ];
    const _colunas0 = await this._colunas0();
    return colunas.concat(_colunas0);
  };
  // Admin
  _filtros2 = async () => {
    const filtros: Array<Filtro> = [];
    const filtros1 = await this._filtros1();
    await this.cnaeModel.find().then((opcoes) => {
      filtros.push({
        ordem: 9,
        codigo: "cnae",
        descricao: "CNAE",
        opcoes: opcoes.map((opcao) => {
          return {
            codigo: `${opcao.codigo}`,
            descricao: `${opcao.descricao}`,
          };
        }),
        selecionados: [],
      });
    });
    await this.ncmProdutoModel.find().then((opcoes) => {
      filtros.push({
        ordem: 8,
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
    return filtros.concat(filtros1);
  };
  _agrupamentos2 = async () => {
    const agrupamentos: Array<Opcao> = [
      {
        codigo: "cnae",
        descricao: "CNAE",
      },
      {
        codigo: "ncm_produto",
        descricao: "NCM Produto",
      },
    ];
    const agrupamentos1 = await this._agrupamentos1();
    return agrupamentos.concat(agrupamentos1);
  };
  _colunas2 = async () => {
    const colunas: Array<Opcao> = [
      {
        codigo: "ncm_produto",
        descricao: "NCM Produto",
      },
      {
        codigo: "ncm_produto_desc",
        descricao: "NCM Produto Descrição",
      },
      {
        codigo: "cnae",
        descricao: "CNAE",
      },
      {
        codigo: "desc_cnae",
        descricao: "CNAE Descrição",
      },
    ];
    const _colunas1 = await this._colunas1();
    return colunas.concat(_colunas1);
  };
}
