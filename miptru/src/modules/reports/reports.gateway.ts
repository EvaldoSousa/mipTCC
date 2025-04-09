import { OnModuleInit, UseGuards } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server } from "socket.io";
import { CSVService } from "./services/csv/csv.service";
import { GraphicsService } from "./services/graphics/graphics.service";
import { GatewayGuard } from "./gateway.guard";

@UseGuards(GatewayGuard)
@WebSocketGateway({ cors: true, maxHttpBufferSize: 7e8 })
export class ReportsGateway implements OnModuleInit {
  constructor(
    private csv: CSVService,
    private graphics: GraphicsService
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on("connection", (socket) => {
      console.log(`connected: ${socket.id}`);
    });
  }
  @SubscribeMessage("gerar-csv")
  async gerarCSV(@MessageBody() json: any, @ConnectedSocket() socket: any) {
    try {
      const user = socket.user;
      await this.csv
        .gerar({ json, perfil: user.perfil, user_id: user._id })
        .then(() => {
          socket.emit(`csv`);
        });
    } catch (error) {
      socket.emit(`error`, {
        message: error.toString(),
      });
    }
  }

  @SubscribeMessage("gerar-grafico-arvore")
  async gerarGraficoArvore(
    @MessageBody() json: any,
    @ConnectedSocket() socket: any
  ) {
    try {
      await this.graphics.gerarGraficoArvore(json).then((records) => {
        console.log(`[Gateway] Dados enviados: ${socket.id}`);
        socket.emit(`onGraficoArvore`, {
          process: 0,
          data: records,
        });
      });
    } catch (error) {
      socket.emit(`error`, {
        message: error.toString(),
      });
    }
  }
}
