import {
  Controller,
  Get,
  NotFoundException,
  Query,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { FiltersCSVService } from "./services/csv/filters.csv.service";
import { FiltersGraphicsService } from "./services/graphics/filters.graphics.service";
import { ControllerGuard } from "./controller.guard";
import { ApiTags } from "@nestjs/swagger";
import { readFile, unlink } from "fs";
import { Response } from "express";
import * as pathpkg from "path";

@ApiTags("Reports")
@UseGuards(ControllerGuard)
@Controller("api/dados")
export class ReportsController {
  constructor(
    private csv: FiltersCSVService,
    private graphics: FiltersGraphicsService
  ) {}

  @Get("filtros")
  async filtrosCSV(@Request() request: any) {
    const perfil = request.user.perfil;
    return await this.csv.buscarParametros({ perfil });
  }

  @Get("filtros-grafico-arvore")
  async filtrosArvore(@Query() query: any) {
    return await this.graphics.buscarFiltrosGraficoArvore(query);
  }
  @Get("download")
  async downloadFile(@Request() request: any, @Res() response: Response) {
    const user = request.user;
    const path = `tabela${user._id}.csv`;
    const filePath = pathpkg.join(process.cwd(), path);
    try {
      const file = await new Promise<Buffer>((resolve, reject) => {
        readFile(filePath, {}, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      response.send(file);
      unlink(filePath, (err) => {
        if (err) {
          console.log(filePath, " error delete", err);
        }
        console.log(filePath, " was deleted");
      });
    } catch (error) {
      throw new NotFoundException(
        "Nenhum dado referente a sua busca foi encontrado."
      );
    }
  }
}
