import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MunicipioEmissorCodigoDocumment =
  HydratedDocument<municipio_emissor_codigo>;

@Schema()
export class municipio_emissor_codigo {
  @Prop()
  municipio_emissor_codigo: string;
}

export const MunicipioEmissorCodigoSchema = SchemaFactory.createForClass(
  municipio_emissor_codigo
);
