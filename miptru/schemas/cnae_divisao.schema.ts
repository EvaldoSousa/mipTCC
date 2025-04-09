import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CNAEDivisaoDocumment = HydratedDocument<cnae_divisao>;

@Schema()
export class cnae_divisao {
  @Prop()
  codigo: string;
  @Prop()
  descricao: string;
}

export const CNAEDivisaoSchema = SchemaFactory.createForClass(cnae_divisao);
