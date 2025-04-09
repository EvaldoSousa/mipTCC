import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CNAEDocumment = HydratedDocument<cnae>;

@Schema()
export class cnae {
  @Prop()
  codigo: string;
  @Prop()
  descricao: string;
}

export const CNAESchema = SchemaFactory.createForClass(cnae);
