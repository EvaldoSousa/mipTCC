import { Controller, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ControllerGuard } from "../reports/controller.guard";
import { createReadStream } from "fs";
import * as csv from "csv-parser";
import { join } from "path";
import { notas_fiscais } from "schemas/notas_fiscais.shema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@ApiTags("Cover")
@UseGuards(ControllerGuard)
@Controller("api/cover")
export class CoverController {
  constructor(
    @InjectModel(notas_fiscais.name)
    private notasFiscaisModel: Model<notas_fiscais>
  ) {}

  async scn(@Request() request: any) {
    const perfil = request.user.perfil;
    try {
      const result = [];
      if (perfil == 2) {
        const stream = createReadStream(
          join(process.cwd(), "database/TradutorNCM.csv")
        );
        stream
          .pipe(csv({ headers: true }))
          .on("data", async (data) => {
            const value = {
              0: data["_0"],
              1: data["_1"],
              2: data["_2"],
              3: data["_3"],
              4: data["_4"],
              5: data["_5"],
              6: data["_6"],
              7: data["_7"],
            };
            result.push(value);
          })
          .on("end", async () => {
            console.log("Começo", result.length);
            const offset = 0;
            const limit = 1146;
            for (let index = 0; index < 10; index++) {
              const valores = result.splice(offset, limit);
              this._insert(index, valores);
            }
            console.log("Fim");
          })
          .on("error", (error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async _insert(tread: number, result: Array<any>) {
    console.log("Início Thread", tread, result.length);
    for (let index = 0; index < result.length; index++) {
      const data = result[index];
      const ncm_produto = `${data["0"]}`;
      await this.notasFiscaisModel.updateMany({
        data: {
          ncm_produto_desc: `${data["1"]}`,
          scn_produto: `${data["2"]}`,
          scn_produto_desc: `${data["3"]}`,
        },
        where: { ncm_produto: ncm_produto },
      });

      // Time
      console.log(
        tread,
        "Porcentagem: ",
        ((index / result.length) * 100).toPrecision(2),
        "%"
      );
    }
    console.log("Fim Thread", tread, result.length);
  }

  async scn_aux(@Request() request: any) {
    const perfil = request.user.perfil;
    try {
      const result = [];
      if (perfil == 2) {
        const stream = createReadStream(
          join(process.cwd(), "database/TradutorNCM.csv")
        );
        stream
          .pipe(csv({ headers: true }))
          .on("data", async (data) => {
            const value = {
              0: data["_0"],
              1: data["_1"],
              2: data["_2"],
              3: data["_3"],
              4: data["_4"],
              5: data["_5"],
              6: data["_6"],
              7: data["_7"],
            };
            result.push(value);
          })
          .on("end", async () => {
            console.log("Começo", result.length);
            result.shift();
            const set = new Set();
            const snapshot = result.map((value) => {
              return {
                scn_produto: value["2"],
                scn_produto_desc: value["3"],
              };
            });
            const data = snapshot.filter((value) => {
              const duplicated = set.has(value.scn_produto);
              set.add(value.scn_produto);
              return !duplicated;
            });
            console.log(data.length);
            // TODO: Transcrever para moongose
            // await this.orm.scn_produto
            //   .createMany({ data })
            //   .catch((error) => console.log(error));
            console.log("Fim");
          })
          .on("error", (error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async scn_aux_ncm(@Request() request: any) {
    const perfil = request.user.perfil;
    try {
      const result = [];
      if (perfil == 2) {
        const stream = createReadStream(
          join(process.cwd(), "database/TradutorNCM.csv")
        );
        stream
          .pipe(csv({ headers: true }))
          .on("data", async (data) => {
            const value = {
              0: data["_0"],
              1: data["_1"],
              2: data["_2"],
              3: data["_3"],
              4: data["_4"],
              5: data["_5"],
              6: data["_6"],
              7: data["_7"],
            };
            result.push(value);
          })
          .on("end", async () => {
            console.log("Começo", result.length);
            result.shift();
            const set = new Set();
            const snapshot = result.map((value) => {
              return {
                ncm_produto: value["0"],
                ncm_produto_desc: value["1"],
              };
            });
            const data = snapshot.filter((value) => {
              const duplicated = set.has(value.ncm_produto);
              set.add(value.ncm_produto);
              return !duplicated;
            });
            console.log(data.length);
            // TODO: Transcrever para moongose
            // await this.orm.ncm_produto
            //   .createMany({ data })
            //   .catch((error) => console.log(error));
            console.log("Fim");
          })
          .on("error", (error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
