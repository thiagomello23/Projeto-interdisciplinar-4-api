import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../Global/prisma.service";
import { UsuarioDto } from "./usuarioDto";
import * as bcrypt from "bcrypt"
import * as dayjs from "dayjs"

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
          cargo: 'USUARIO'
        }
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao se cadastrar, por favor tente novamente!")
    }
    return;
  }

  async generateRelatorio(usuarioId: number, relatorio: RelatorioData) {

    // Verifica se as datas são iguais e inicializa as variaveis de data
    let dataInicial: any = dayjs(relatorio.dataInicial)
    let dataFinal: any = dayjs(relatorio.dataFinal)
    let isEqualDate = false;

    if(
      dataInicial.day() === dataFinal.day() &&
      dataInicial.month() === dataFinal.month() &&
      dataInicial.year() === dataFinal.year()
    ) {
      isEqualDate = true;
    }

    // Dados que vão ser selecionados na consulta
    const selectItems = {
      horario: relatorio.horario,
      idade: relatorio.idade,
      nome: relatorio.nome,
      sobrenome: relatorio.sobrenome,
      procedimento: relatorio.procedimento,
      valor: relatorio.valor,
      telefone: relatorio.telefone,
      data: true
    }

    // Transforma as datas da maneira correta
    try {
      dataInicial = dataInicial.hour(0).toISOString()
      dataFinal = dataFinal.hour(23).toISOString()
    } catch(e) {
      throw new BadRequestException("Data invalida!")
    }

    // Verifica se o usuário selecionou algum procedimento
    let relatorioData;

    if(relatorio.filtroSel) {
      try {
        relatorioData = await this.prismaService.paciente.findMany({
          where: {
            usuarioId: usuarioId,
            AND: [
              {
                data: isEqualDate ? dataInicial : {
                  gte: dataInicial,
                  lt: dataFinal
                }
              },
              relatorio.hora ? {
                horario: +relatorio.hora
              } : {}
            ]
          },
          select: selectItems,
          orderBy: [
            {
              [relatorio.filtroSel]: relatorio.filtro === 'Ascendente' ? 'asc': 'desc' 
            }
          ]
        })
      } catch(e) {
        throw new InternalServerErrorException("Falha ao gerar relatório, por favor tente novamente")
      }
    } else {
      try {
        relatorioData = await this.prismaService.paciente.findMany({
          where: {
            usuarioId: usuarioId,
            AND: [
              {
                data: isEqualDate ? dataInicial : {
                  gte: dataInicial,
                  lt: dataFinal
                }
              },
              relatorio.hora ? {
                horario: +relatorio.hora
              } : {}
            ]
          },
          select: selectItems,
        })
      } catch(e) {
        throw new InternalServerErrorException("Falha ao gerar relatório, por favor tente novamente")
      }
    }

    // Retornar os dados
    return relatorioData
  }

  async getAllUsers() {
    return await this.prismaService.usuario.findMany({
      where: {
        cargo: 'USUARIO'
      }
    })
  }
}