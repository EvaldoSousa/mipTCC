import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SCNProdutoDocumment = HydratedDocument<scn_produto>;

@Schema()
export class scn_produto {
  @Prop()
  scn_produto: string;
  @Prop()
  scn_produto_desc: string;
}

export const SCNProdutoSchema = SchemaFactory.createForClass(scn_produto);
