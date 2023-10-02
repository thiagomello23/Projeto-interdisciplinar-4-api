import {
  Injectable,
  UnauthorizedException
} from "@nestjs/common"
import { PrismaService } from "../Global/prisma.service";
import { AuthDto } from "./authDto";
import * as bcrypt from "bcrypt"
import {JwtService, JwtVerifyOptions} from "@nestjs/jwt"

@Injectable()
export class AuthService {

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ){}

  async login(usuario: AuthDto) {

    // Verifica se o usuário existe
    const authUser = await this.prismaService.usuario.findUnique({
      where: {
        email: usuario.email
      }
    })

    // Compara as senhas
    const result = await bcrypt.compare(usuario.senha, authUser.senha)

    if(!result)
      throw new UnauthorizedException("Email ou senha invalidos!")

    // Gera o token 
    return await this.jwtService.signAsync({
      email: authUser.email,
      id: authUser.id,
      cargo: authUser.cargo
    })
  }

  async validate(token: string) {
    try {
      const validate = this.jwtService.verify(token, process.env.JWT_SECRET.toString() as JwtVerifyOptions)
      return validate;
    } catch(e) {
      throw new UnauthorizedException("Token invalido!")
    }
  }
}