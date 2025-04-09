import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RequestUserBody } from "../interfaces/user";
import { InjectModel } from "@nestjs/mongoose";
import { usuarios } from "schemas/usuarios.schema";
import { Model, MongooseError } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(usuarios.name) private usuariosModel: Model<usuarios>
  ) {}
  async create(body: RequestUserBody) {
    try {
      const senhaCriptografada = await bcrypt.hash(body.senha, 10);
      await this.usuariosModel.create({ ...body, senha: senhaCriptografada });
    } catch (error: any) {
      if (error instanceof MongooseError) {
        throw new BadGatewayException(error.message);
      }
      throw new BadRequestException(error.message);
    }

    return {};
  }
}
