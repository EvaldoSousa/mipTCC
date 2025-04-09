import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NotasFiscaisDocument = HydratedDocument<notas_fiscais>;

@Schema()
export class notas_fiscais {
  @Prop()
  ano: number;
  @Prop()
  municipio_emissor: string;
  @Prop()
  municipio_emissor_codigo: string;
  @Prop()
  uf_emissor: string;
  @Prop()
  municipio_destinatario: string;
  @Prop()
  municipio_destinatario_codigo: string;
  @Prop()
  uf_destinatario: string;
  @Prop()
  cfop: string;
  @Prop()
  desc_cfop: string;
  @Prop()
  cfop_1d: string;
  @Prop()
  cfop_2d: string;
  @Prop()
  cfop_3d: string;
  @Prop()
  ncm_produto: string;
  @Prop()
  ncm_produto_desc: string;
  @Prop()
  scn_produto: string;
  @Prop()
  scn_produto_desc: string;
  @Prop()
  cnae: string;
  @Prop()
  desc_cnae: string;
  @Prop()
  cnae_divisao: string;
  @Prop()
  cnae_divisao_desc: string;
  @Prop()
  cnae_grupo: string;
  @Prop()
  cnae_grupo_desc: string;
  @Prop()
  cnae_classe_4d: string;
  @Prop()
  cnae_classe_4d_desc: string;
  @Prop()
  cnae_classe_5d: string;
  @Prop()
  cnae_classe_5d_desc: string;
  @Prop()
  scr_2010_trabalho: string;
  @Prop()
  scr_2010_trabalho_desc: string;
  @Prop()
  scr_2010_divulga: string;
  @Prop()
  scr_2010_divulga_desc: string;
  @Prop()
  total_bruto_produtos: number;
}

export const NotasFiscaisSchema = SchemaFactory.createForClass(notas_fiscais);
