import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CFOP2dDocumment = HydratedDocument<cfop_2d>;

@Schema()
export class cfop_2d {
  @Prop()
  cfop_2d: string;
}

export const CFOP2dSchema = SchemaFactory.createForClass(cfop_2d);
