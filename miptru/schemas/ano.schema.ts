import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AnoDocumment = HydratedDocument<ano>;

@Schema()
export class ano {
  @Prop()
  ano: number;
}

export const AnoSchema = SchemaFactory.createForClass(ano);
