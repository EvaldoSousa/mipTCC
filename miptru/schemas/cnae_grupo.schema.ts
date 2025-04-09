import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CNAEGrupoDocumment = HydratedDocument<cnae_grupo>;

@Schema()
export class cnae_grupo {
  @Prop()
  codigo: string;
  @Prop()
  descricao: string;
}

export const CNAEGrupoSchema = SchemaFactory.createForClass(cnae_grupo);
