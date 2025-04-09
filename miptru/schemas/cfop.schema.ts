import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CFOPDocumment = HydratedDocument<cfop>;

@Schema()
export class cfop {
  @Prop()
  codigo: string;
  @Prop()
  descricao: string;
}

export const CFOPSchema = SchemaFactory.createForClass(cfop);
