import { Injectable } from "@nestjs/common";
import { createObjectCsvWriter } from "csv-writer";
import { FiltersCSVService } from "./filters.csv.service";
import { InjectModel } from "@nestjs/mongoose";
import { notas_fiscais } from "schemas/notas_fiscais.shema";
import { Model } from "mongoose";
import { ObjectMap } from "csv-writer/src/lib/lang/object";
import { CsvWriter } from "csv-writer/src/lib/csv-writer";
import * as pathpkg from "path";
interface GerarCSVProps {
  json: any;
  user_id: number;
  perfil: number;
}
@Injectable()
export class CSVService {
  constructor(
    private filters: FiltersCSVService,
    @InjectModel(notas_fiscais.name)
    private notasFiscaisModel: Model<notas_fiscais>
  ) {}

  gerar = async (props: GerarCSVProps) => {
    const path = `tabela${props.user_id}.csv`;
    const where: any = this._buscarWhere(props.json.filtros);
    const agrupamento = this._buscarAgrupamento(props.json.agrupamento);
    const csvWriter = await this._criarArquivoCSV(
      path,
      agrupamento,
      props.json.colunas,
      props.perfil
    );
    const headers = await this._criarHeaders(
      agrupamento,
      props.json.colunas,
      props.perfil
    );
    try {
      if (agrupamento.length > 0) {
        await this._gerarComAgrupamento(csvWriter, where, agrupamento);
      } else {
        await this._gerarSemAgrupamento(csvWriter, where, headers);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  _gerarComAgrupamento = async (
    csvWriter: CsvWriter<ObjectMap<any>>,
    where: any,
    agrupamento: string[]
  ) => {
    await this.notasFiscaisModel
      .aggregate([
        {
          $match: where,
        },
        {
          $group: {
            _id: `$${agrupamento[0]}`,
            total_bruto_produtos: { $sum: "$total_bruto_produtos" },
          },
        },
      ])
      .then(async (response) => {
        if (response.length > 0) {
          const records = response.map((value) => {
            const record = {};
            record[agrupamento[0]] = value["_id"];
            record["total_bruto_produtos"] =
              value.total_bruto_produtos.toLocaleString("pt-br", {
                minimumFractionDigits: 2,
              });
            return record;
          });
          await csvWriter.writeRecords(records);
        }
      });
  };

  _gerarSemAgrupamento = async (
    csvWriter: CsvWriter<ObjectMap<any>>,
    where: any,
    headers: any
  ) => {
    const batchSize = 100;
    const query = this.notasFiscaisModel.find(where).batchSize(batchSize);

    let block = [];
    const cursor = query.cursor();
    let value;

    while ((value = await cursor.next())) {
      const record = {};
      headers.forEach((element: { id: string; title: string }) => {
        if (element.id == "total_bruto_produtos") {
          record[element.id] = value.total_bruto_produtos.toLocaleString(
            "pt-br",
            {
              minimumFractionDigits: 2,
            }
          );
        } else {
          record[element.id] = value[element.id];
        }
      });

      block.push(record);

      if (block.length >= batchSize) {
        await csvWriter.writeRecords(block);
        block = [];
      }
    }

    if (block.length > 0) {
      await csvWriter.writeRecords(block);
    }
  };

  _criarArquivoCSV = async (
    path: string,
    agrupamento: any[],
    colunas: any[],
    perfil: number
  ) => {
    try {
      const headers = await this._criarHeaders(agrupamento, colunas, perfil);
      const filePath = pathpkg.join(process.cwd(), path);
      return createObjectCsvWriter({
        path: filePath,
        header: headers,
        fieldDelimiter: ";",
        encoding: "utf-8",
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  _criarHeaders = async (
    agrupamento: any[],
    colunas: any[],
    perfil: number
  ) => {
    let headers: any = [];
    if (colunas.length > 0) {
      headers = colunas.map((value: any) => {
        return { id: value.codigo, title: value.descricao };
      });
    } else if (agrupamento.length > 0) {
      const colunasFilters = await this.filters.buscarColunas({ perfil });
      const find = colunasFilters.find(
        ({ codigo }) => codigo === agrupamento[0]
      );
      if (find) {
        headers = [{ id: find.codigo, title: find.descricao }];
        headers.push({
          id: "total_bruto_produtos",
          title: "Total Bruto Produtos",
        });
      }
    } else {
      const colunasFilters = await this.filters.buscarColunas({ perfil });
      headers = colunasFilters.map((value: any) => {
        return { id: value.codigo, title: value.descricao };
      });
    }
    return headers;
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
    console.log(where);
    return where;
  };

  _buscarAgrupamento = (agrupamento_: any) => {
    const agrupamento: string[] = [];
    if (agrupamento_.codigo !== "") {
      agrupamento.push(agrupamento_.codigo);
    }
    return agrupamento;
  };
}
