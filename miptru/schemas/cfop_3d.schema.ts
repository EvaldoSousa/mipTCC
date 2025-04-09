import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CFOP3dDocumment = HydratedDocument<cfop_3d>;

@Schema()
export class cfop_3d {
  @Prop()
  cfop_3d: string;
}

export const CFOP3dSchema = SchemaFactory.createForClass(cfop_3d);
