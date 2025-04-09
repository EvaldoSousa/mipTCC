import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GatewayGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake.auth.token;
    if (!token) {
      client.emit('error', {
        message: '[GUARD] Token não fornecido ou inválido',
      });
      return false;
    }

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
      client.user = user;
      console.log(`[Gateway] Solicitação recebida: ${client.id}`);
      client.emit(`process`, {
        message: 'Solicitação aceita!',
      });
      return true;
    } catch (error) {
      client.emit('error', {
        message:
          '[GUARD] Token não fornecido ou inválido, atualize a página e tente novamente!',
      });
      return false;
    }
  }
}
