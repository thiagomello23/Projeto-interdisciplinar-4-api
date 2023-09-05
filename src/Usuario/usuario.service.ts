import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UsuarioDto } from "./usuarioDto";
import * as bcrypt from "bcrypt"

@Injectable()
export class UsuarioService {

  constructor(private prismaService: PrismaService) {}

  async createUser(usuario: UsuarioDto) {
    // Validar email
    const validation = await this.prismaService.usuario.findUnique({
      where: {
        email: usuario.email
      }
    })

    if(validation)
      throw new BadRequestException("Usuário já cadastrado com este email")

    // Criptografar senha
    const crypt = await bcrypt.hash(usuario.senha, 10)

    // Inserir no banco de dados
    try {
      await this.prismaService.usuario.create({
        data: {
          email: usuario.email,
          nome: usuario.nome,
          senha: crypt,
          telefone: usuario.telefone,
          cargo: usuario.cargo
        }
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao se cadastrar, por favor tente novamente!")
    }
    return;
  }

  async getAllUsers() {
    return await this.prismaService.usuario.findMany()
  }
}