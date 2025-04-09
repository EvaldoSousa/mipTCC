import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "src/modules/auth/auth.guard";
import { Role } from "src/role.decorator";
import { UserService } from "./services/user.service";
import { RequestUserBody } from "./interfaces/user";
import { UserDefaultDTO } from "./dtos/user_default";
import { ApiBasicAuth, ApiBody, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dtos/login";
@ApiBasicAuth()
@ApiSecurity("basic")
@ApiTags("Auth")
@Controller("api/auth")
export class AuthController {
  constructor(
    private auth: AuthService,
    private user: UserService
  ) {}

  @ApiBody({ type: LoginDTO })
  @Post("login")
  async login(@Body() body: LoginDTO) {
    return await this.auth.login(body);
  }

  @Post("recuperar-senha")
  async recoveryPassword(@Body() body) {
    return await this.auth.recoverPassword(body);
  }

  @Post("criar-nova-senha")
  async createNewPassWord(@Body() body) {
    return await this.auth.createNewPassword(body);
  }

  @Role(0)
  @UseGuards(AuthGuard)
  @Post("alterar-senha")
  async updatePassword(@Body() body) {
    return await this.auth.updatePassword(body);
  }

  @Role(2)
  @UseGuards(AuthGuard)
  @Post("user/create")
  async createUser(@Body() body: RequestUserBody) {
    return await this.user.create(body);
  }

  @Post("user/create-default")
  async createUserDefault(@Body() body: UserDefaultDTO) {
    const user = { ...body, perfil: 0 };
    return await this.user.create(user);
  }
}
