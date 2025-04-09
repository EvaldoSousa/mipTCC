import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UFDestinatarioDocumment = HydratedDocument<uf_destinatario>;

@Schema()
export class uf_destinatario {
  @Prop()
  uf_destinatario: string;
}

export const UFDestinatarioSchema =
  SchemaFactory.createForClass(uf_destinatario);
