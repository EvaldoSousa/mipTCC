import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UFEmissorDocumment = HydratedDocument<uf_emissor>;

@Schema()
export class uf_emissor {
  @Prop()
  uf_emissor: string;
}

export const UFEmissorSchema = SchemaFactory.createForClass(uf_emissor);
