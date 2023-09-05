import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common"
import { JwtService } from '@nestjs/jwt'
import { Request } from "express"
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector){}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;

    const authRole = this.reflector.get<'USUARIO'|'ADMINISTRADOR'>('auth', context.getHandler())

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if(isPublic) {
      return true;
    }

    if(!token) {
      throw new UnauthorizedException("Usuário não autenticado")
    }

    try {
      const payload: PayloadJwt = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })

      // Role Authentication
      if(!(payload.cargo === authRole))
        return false;

      request['auth'] = await payload; // Documentado
      return true;
    } catch(e) {
      throw new UnauthorizedException("Usuário não autenticado")
    }
  }
}