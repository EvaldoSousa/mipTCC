import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SCR2010TrabalhoDocumment = HydratedDocument<scr_2010_trabalho>;

@Schema()
export class scr_2010_trabalho {
  @Prop()
  codigo: string;
  @Prop()
  descricao: string;
}

export const SCR2010TrabalhoSchema =
  SchemaFactory.createForClass(scr_2010_trabalho);
