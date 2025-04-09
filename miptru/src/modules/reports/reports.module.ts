import { Module } from "@nestjs/common";
import { ReportsController } from "./reports.controller";
import { ReportsGateway } from "./reports.gateway";
import { FiltersCSVService } from "./services/csv/filters.csv.service";
import { FiltersGraphicsService } from "./services/graphics/filters.graphics.service";
import { CSVService } from "./services/csv/csv.service";
import { GraphicsService } from "./services/graphics/graphics.service";
import { notas_fiscais, NotasFiscaisSchema } from "schemas/notas_fiscais.shema";
import { MongooseModule } from "@nestjs/mongoose";
import { ano, AnoSchema } from "schemas/ano.schema";
import { cfop, CFOPSchema } from "schemas/cfop.schema";
import { cfop_1d, CFOP1dSchema } from "schemas/cfop_1d.schema";
import { cfop_2d, CFOP2dSchema } from "schemas/cfop_2d.schema";
import { cfop_3d, CFOP3dSchema } from "schemas/cfop_3d.schema";
import { cnae, CNAESchema } from "schemas/cnae.schema";
import {
  cnae_classe_4d,
  CNAEClasse4dSchema,
} from "schemas/cnae_classe_4d.schema";
import {
  cnae_classe_5d,
  CNAEClasse5dSchema,
} from "schemas/cnae_classe_5d.schema";
import { cnae_divisao, CNAEDivisaoSchema } from "schemas/cnae_divisao.schema";
import { cnae_grupo, CNAEGrupoSchema } from "schemas/cnae_grupo.schema";
import {
  municipio_destinatario,
  MunicipioDestinatarioSchema,
} from "schemas/municipio_destinatrio.schema";
import {
  municipio_destinatario_codigo,
  MunicipioDestinatarioCodigoSchema,
} from "schemas/municipio_destinatario_codigo.schema";
import {
  municipio_emissor,
  MunicipioEmissorSchema,
} from "schemas/municipio_emissor.schema";
import {
  municipio_emissor_codigo,
  MunicipioEmissorCodigoSchema,
} from "schemas/municipio_emissor_codigo.schema";
import { scn_produto, SCNProdutoSchema } from "schemas/scn_produto.schema";
import {
  scr_2010_divulga,
  SCR2010DivulgaSchema,
} from "schemas/scr_2010_divulga.schema";
import {
  scr_2010_trabalho,
  SCR2010TrabalhoSchema,
} from "schemas/scr_2010_trabalho.schema";
import { uf_emissor, UFEmissorSchema } from "schemas/uf_emissor.schema";
import {
  uf_destinatario,
  UFDestinatarioSchema,
} from "schemas/uf_destinatario.schema";
import { ncm_produto, NCMProdutoSchema } from "schemas/ncm_produto.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ano.name, schema: AnoSchema, collection: ano.name },
      { name: cfop.name, schema: CFOPSchema, collection: cfop.name },
      { name: cfop_1d.name, schema: CFOP1dSchema, collection: cfop_1d.name },
      { name: cfop_2d.name, schema: CFOP2dSchema, collection: cfop_2d.name },
      { name: cfop_3d.name, schema: CFOP3dSchema, collection: cfop_3d.name },
      { name: cnae.name, schema: CNAESchema, collection: cnae.name },
      {
        name: cnae_classe_4d.name,
        schema: CNAEClasse4dSchema,
        collection: cnae_classe_4d.name,
      },
      {
        name: cnae_classe_5d.name,
        schema: CNAEClasse5dSchema,
        collection: cnae_classe_5d.name,
      },
      {
        name: cnae_divisao.name,
        schema: CNAEDivisaoSchema,
        collection: cnae_divisao.name,
      },
      {
        name: cnae_grupo.name,
        schema: CNAEGrupoSchema,
        collection: cnae_grupo.name,
      },
      {
        name: municipio_destinatario.name,
        schema: MunicipioDestinatarioSchema,
        collection: municipio_destinatario.name,
      },
      {
        name: municipio_destinatario_codigo.name,
        schema: MunicipioDestinatarioCodigoSchema,
        collection: municipio_destinatario_codigo.name,
      },
      {
        name: municipio_emissor.name,
        schema: MunicipioEmissorSchema,
        collection: municipio_emissor.name,
      },
      {
        name: municipio_emissor_codigo.name,
        schema: MunicipioEmissorCodigoSchema,
        collection: municipio_emissor_codigo.name,
      },
      {
        name: notas_fiscais.name,
        schema: NotasFiscaisSchema,
        collection: notas_fiscais.name,
      },
      {
        name: ncm_produto.name,
        schema: NCMProdutoSchema,
        collection: ncm_produto.name,
      },
      {
        name: scn_produto.name,
        schema: SCNProdutoSchema,
        collection: scn_produto.name,
      },
      {
        name: scr_2010_divulga.name,
        schema: SCR2010DivulgaSchema,
        collection: scr_2010_divulga.name,
      },
      {
        name: scr_2010_trabalho.name,
        schema: SCR2010TrabalhoSchema,
        collection: scr_2010_trabalho.name,
      },
      {
        name: uf_emissor.name,
        schema: UFEmissorSchema,
        collection: uf_emissor.name,
      },
      {
        name: uf_destinatario.name,
        schema: UFDestinatarioSchema,
        collection: uf_destinatario.name,
      },
    ]),
  ],
  controllers: [ReportsController],
  providers: [
    ReportsGateway,
    FiltersCSVService,
    FiltersGraphicsService,
    CSVService,
    GraphicsService,
  ],
})
export class ReportsModule {}
