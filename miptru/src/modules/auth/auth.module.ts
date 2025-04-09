import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { usuarios, UsuariosSchema } from "schemas/usuarios.schema";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: usuarios.name, schema: UsuariosSchema },
    ]),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"Suporte LACAM" <lacam.dev@gmail.com>',
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: "2d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
