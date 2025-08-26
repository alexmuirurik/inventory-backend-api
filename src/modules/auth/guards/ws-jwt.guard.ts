import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
declare module 'socket.io' {
  interface Socket {
    userId?: string;
  }
}
@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') return true;
    const client: Socket = context.switchToWs().getClient();
    WsJwtGuard.validateToken(client);
    return true;
  }

  static validateToken(client: Socket) {
    const { authorization } = client.handshake.headers;
    const token: string = authorization.split(' ')[1];
    const payload = verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (payload.sub) {
      Object.assign(client, { userId: payload.sub });
    }
    return payload;
  }
}
