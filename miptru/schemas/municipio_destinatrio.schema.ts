import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MunicipioDestinatarioDocumment =
  HydratedDocument<municipio_destinatario>;

@Schema()
export class municipio_destinatario {
  @Prop()
  municipio_destinatario: string;
}

export const MunicipioDestinatarioSchema = SchemaFactory.createForClass(
  municipio_destinatario
);
