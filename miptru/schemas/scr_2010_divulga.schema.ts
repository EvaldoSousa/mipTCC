import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SCR2010DivulgaDocumment = HydratedDocument<scr_2010_divulga>;

@Schema()
export class scr_2010_divulga {
  @Prop()
  codigo: string;
  @Prop()
  descricao: string;
}

export const SCR2010DivulgaSchema =
  SchemaFactory.createForClass(scr_2010_divulga);
