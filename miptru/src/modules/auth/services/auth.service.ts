import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
import { InjectModel } from "@nestjs/mongoose";
import { usuarios } from "schemas/usuarios.schema";
import { Model, MongooseError } from "mongoose";
import { Login } from "../interfaces/login";
import { CreateNewPasswordBody } from "../interfaces/create_new_user";
import { UpdatePasswordBody } from "../interfaces/update_password";
export const email = process.env.EMAIL_USERNAME;

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private email: MailerService,
    @InjectModel(usuarios.name)
    private usuariosModel: Model<usuarios>
  ) {}
  async login(body: Login) {
    let user;
    try {
      user = await this.usuariosModel.findOne({
        nomeusuario: body.username,
      });
    } catch (error: any) {
      if (error instanceof MongooseError) {
        throw new ServiceUnavailableException(error.message);
      }
      throw new BadRequestException(error);
    }

    if (user) {
      if (!(await bcrypt.compare(body.password, user.senha))) {
        throw new UnauthorizedException("Senha incorreta");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...userWithoutPass } = user._doc;
      const userJson = JSON.stringify(userWithoutPass, (_, value) => {
        return typeof value === "bigint" ? value.toString() : value;
      });
      const accessToken = await this.jwt.signAsync(JSON.parse(userJson));
      const result = {
        ...userWithoutPass,
        accessToken,
      };
      return {
        id: result._id.toString(),
        name: result.nome,
        email: result.email,
        accessToken: result.accessToken,
        perfil: result.perfil,
      };
    } else {
      throw new NotFoundException("Usuário não encontrado");
    }
  }
  async recoverPassword(body: any) {
    const token = await this.jwt.signAsync(body);
    try {
      const user = await this.usuariosModel.findOne({
        email: body.email,
      });
      if (user) {
        await this.email.sendMail({
          from: email,
          to: body.email,
          text: "MIP TRU",
          subject: "Recupração de senha",
          html: `<p>Click no link para redefinir sua senha: </p> <p>${process.env.HOST_APP}/criar-nova-senha?token=${token}</p> <a href="${process.env.HOST_APP}/criar-nova-senha?token=${token}">Link</a>`,
        });
      } else {
        throw new NotFoundException("usuário não encontrado");
      }
    } catch (error: any) {
      throw new BadRequestException(error.toString());
    }
    return {};
  }
  async createNewPassword(body: CreateNewPasswordBody) {
    const tokenDecoded = await this.jwt.verifyAsync(body.token);
    if (tokenDecoded) {
      try {
        const senhaCriptografada = await bcrypt.hash(body.senha, 10);
        await this.usuariosModel.findOneAndUpdate(
          {
            email: tokenDecoded.email,
          },
          {
            senha: senhaCriptografada,
          }
        );
      } catch (error: any) {
        throw new BadRequestException(error.message);
      }
    } else {
      throw new UnauthorizedException("token inválido");
    }
    return {};
  }
  async updatePassword(body: UpdatePasswordBody) {
    let user;
    try {
      const id = body.id_usuario;
      user = await this.usuariosModel.findOne({
        id: id,
      });
      if (user) {
        if (!(await bcrypt.compare(body.senha_atual, user.senha))) {
          throw new UnauthorizedException("Senha Atual Incorreta");
        }

        const senhaCriptografada = await bcrypt.hash(body.nova_senha, 10);
        await this.usuariosModel.findOneAndUpdate(
          {
            id,
          },
          {
            senha: senhaCriptografada,
          }
        );

        return {
          sucess: true,
          message: "Senha Alterada",
        };
      } else {
        throw new NotFoundException("Usuário não encontrado");
      }
    } catch (error: any) {
      if (error instanceof MongooseError) {
        throw new ServiceUnavailableException(
          "Não foi possível se conectar com o servidor"
        );
      }
      if (error instanceof MongooseError) {
        throw new ServiceUnavailableException(error.message);
      }
      throw new BadRequestException(error.toString());
    }
  }
}
