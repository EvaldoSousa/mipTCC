import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MunicipioEmissorDocumment = HydratedDocument<municipio_emissor>;

@Schema()
export class municipio_emissor {
  @Prop()
  municipio_emissor: string;
}

export const MunicipioEmissorSchema =
  SchemaFactory.createForClass(municipio_emissor);
