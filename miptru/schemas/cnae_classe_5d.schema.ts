import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CNAEClasse5dDocumment = HydratedDocument<cnae_classe_5d>;

@Schema()
export class cnae_classe_5d {
  @Prop()
  codigo: string;
  @Prop()
  descricao: string;
}

export const CNAEClasse5dSchema = SchemaFactory.createForClass(cnae_classe_5d);
