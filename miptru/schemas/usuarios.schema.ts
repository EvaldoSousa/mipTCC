import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsuariosDocumment = HydratedDocument<usuarios>;

@Schema()
export class usuarios {
  @Prop()
  nome: string;
  @Prop()
  sobrenome: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ unique: true, required: true })
  nomeusuario: string;
  @Prop()
  perfil: number;
  @Prop()
  senha: string;
}

export const UsuariosSchema = SchemaFactory.createForClass(usuarios);
