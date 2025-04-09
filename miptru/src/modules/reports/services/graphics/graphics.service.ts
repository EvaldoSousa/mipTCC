import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { notas_fiscais } from "schemas/notas_fiscais.shema";

@Injectable()
export class GraphicsService {
  constructor(
    @InjectModel(notas_fiscais.name)
    private notasFiscaisModel: Model<notas_fiscais>
  ) {}

  gerarGraficoArvore = async (json: any) => {
    const agrupamento = json.agrupamento.codigo;
    const where: any = this._buscarWhere(json.filtros);

    return await this.notasFiscaisModel
      .aggregate([
        {
          $match: where,
        },
        {
          $group: {
            _id: `$${agrupamento}`,
            total_bruto_produtos: { $sum: "$total_bruto_produtos" },
          },
        },
        {
          $sort: {
            total_bruto_produtos: -1,
          },
        },
      ])
      .then(async (response) => {
        if (response.length == 0) {
          return [];
        }
        const records = response.map((value) => {
          const record = {};
          record[agrupamento] = value["_id"];
          record["total_bruto_produtos"] = value.total_bruto_produtos;
          return record;
        });
        return records;
      })
      .catch((error) => {
        throw new BadRequestException(error.toString());
      });
  };

  _buscarWhere = (filtros: any) => {
    const where: any = {};
    filtros.forEach((value: any) => {
      where[value.codigo] = {
        $in: value.selecionados.map((selecionado: any) => {
          if (value.codigo === "ano") {
            return parseInt(selecionado.codigo, 10);
          }
          return selecionado.codigo;
        }),
      };
    });
    return where;
  };
}
