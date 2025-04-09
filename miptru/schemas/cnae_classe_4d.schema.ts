import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CNAEClasse4dDocumment = HydratedDocument<cnae_classe_4d>;

@Schema()
export class cnae_classe_4d {
  @Prop()
  codigo: string;
  @Prop()
  descricao: string;
}

export const CNAEClasse4dSchema = SchemaFactory.createForClass(cnae_classe_4d);
