import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MunicipioDestinatarioCodigoDocumment =
  HydratedDocument<municipio_destinatario_codigo>;

@Schema()
export class municipio_destinatario_codigo {
  @Prop()
  municipio_destinatario_codigo: string;
}

export const MunicipioDestinatarioCodigoSchema = SchemaFactory.createForClass(
  municipio_destinatario_codigo
);
