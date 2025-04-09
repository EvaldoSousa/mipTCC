import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CFOP1dDocumment = HydratedDocument<cfop_1d>;

@Schema()
export class cfop_1d {
  @Prop()
  cfop_1d: string;
}

export const CFOP1dSchema = SchemaFactory.createForClass(cfop_1d);
