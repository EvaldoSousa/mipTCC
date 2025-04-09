import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });

      const role = this.reflector.get<number[]>('role', context.getHandler());
      if (role?.length > 0) {
        this._canRolePermission(role[0], payload.perfil);
      }

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Sessão inspirou, faça login novamente');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  _canRolePermission(role_required: number, role_user: number) {
    if (role_user < role_required) {
      throw new ForbiddenException('Permissão insuficiente');
    }
  }
}
