import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NCMProdutoDocumment = HydratedDocument<ncm_produto>;

@Schema()
export class ncm_produto {
  @Prop()
  ncm_produto: string;
  @Prop()
  ncm_produto_desc: string;
}

export const NCMProdutoSchema = SchemaFactory.createForClass(ncm_produto);
