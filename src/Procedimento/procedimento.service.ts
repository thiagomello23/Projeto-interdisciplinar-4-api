import {
  Injectable,
  InternalServerErrorException,
  BadRequestException
} from "@nestjs/common"
import { PrismaService } from "src/Global/prisma.service";
import { ProcedimentoDto } from "./procedimentoDto";

@Injectable()
export class ProcedimentoService {

  constructor(
    private prismaService: PrismaService
  ){}

  async createProcedimento(usuarioId: number, procedimento: ProcedimentoDto) {

    // Valida se o procedimento já existe
    const validation = await this.prismaService.procedimento.findUnique({
      where: {
        nome: procedimento.nome
      }
    })

    if(validation)
      throw new BadRequestException("Procedimento já cadastrado")

    try {
      await this.prismaService.procedimento.create({
        data: {
          nome: procedimento.nome,
          valor: procedimento.valor,
          usuarioId: usuarioId
        }
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao cadastrar o procedimento, tente novamente!")
    }
  }

  async getAllProcedimentos(usuarioId: number) {
    try {
      return await this.prismaService.procedimento.findMany({
        where: {
          usuarioId: usuarioId
        }
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao carregar os procedimentos, tente novamente!")
    }
  }

  async updateProcedimento(procedimento: ProcedimentoDto) {

    // Valida se o procedimento já existe
    const validation = await this.prismaService.procedimento.findUnique({
      where: {
        nome: procedimento.nome
      }
    })

    if(validation)
    throw new BadRequestException("Procedimento já cadastrado")

    try {
      await this.prismaService.procedimento.update({
        where: {
          id: +procedimento.id
        },
        data: {
          nome: procedimento.nome,
          valor: procedimento.valor,
        }
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao editar o procedimento, tente novamente!")
    }
  }
}