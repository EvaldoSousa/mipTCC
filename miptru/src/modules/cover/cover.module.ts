import { Module } from "@nestjs/common";
import { CoverController } from "./cover.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { notas_fiscais, NotasFiscaisSchema } from "schemas/notas_fiscais.shema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: notas_fiscais.name, schema: NotasFiscaisSchema },
    ]),
  ],
  controllers: [CoverController],
  providers: [],
})
export class CoverModule {}
