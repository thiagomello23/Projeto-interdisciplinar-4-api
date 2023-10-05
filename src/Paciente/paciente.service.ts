import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common"
import { PrismaService } from "src/Global/prisma.service";
import { PacienteDto } from "./pacienteDto";
import * as dayjs from "dayjs"

@Injectable()
export class PacienteService {

  constructor(
    private prismaService: PrismaService
  ){}

  async createPaciente(id: number, paciente: PacienteDto) {
    // Transformando em data
    const date = dayjs(paciente.data)

    // Verifica o procedimento
    let procedimento;
    try {
      procedimento = await this.prismaService.procedimento.findUnique({
        where: {
          nome: paciente.procedimento
        }
      })
    } catch(e) {
      throw new BadRequestException("Procedimento não existe!")
    }

    // Insere o novo cadastro no banco de dados
    try {
      await this.prismaService.paciente.create({
        data: {
          nome: paciente.nome,
          sobrenome: paciente.sobrenome,
          procedimento: paciente.procedimento,
          telefone: paciente.telefone,
          idade: paciente.idade,
          horario: paciente.horario,
          data: date.toISOString(),
          usuarioId: id,
          valor: procedimento.valor.toString()
        }
      });
    } catch(e) {
      console.log(e)
      throw new InternalServerErrorException("Falha ao cadastrar um paciente, por favor tente novamente!")
    }

    return;
  }

  async updatePacient(paciente: PacienteDto) {
    // Transformando em data
    const date = dayjs(paciente.data)

    try {
      await this.prismaService.paciente.update({
        where: {
          id: +paciente.id
        },
        data: {
          nome: paciente.nome,
          sobrenome: paciente.sobrenome,
          procedimento: paciente.procedimento,
          telefone: paciente.telefone,
          idade: paciente.idade,
          horario: paciente.horario,
          data: date.toISOString(),
        }
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao editar o paciente, por favor tente novamente!")
    }
  }

  // Puxa todos os pacientes com base no dia atual
  async getAllPacients(id: number) {
    const diaAtual = dayjs().format("YYYY-M-D");
    try {
      return await this.prismaService.paciente.findMany({
        where: {
          usuarioId: id,
          data: {
            gte: dayjs(diaAtual).hour(0).toISOString(),
            lt: dayjs(diaAtual).hour(22).toISOString(),
          }
        },
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao puxar os pacientes, por favor tente novamente!")
    }
  }

  async getAllPacientsByDate(id: number, date: Date) {
    try {
      return await this.prismaService.paciente.findMany({
        where: {
          usuarioId: id,
          data: {
            gte: dayjs(date).hour(0).toISOString(),
            lt: dayjs(date).hour(22).toISOString(),
          }
        },
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao puxar os pacientes, por favor tente novamente!")
    }
  }

  async getSinglePacient(pacienteId: number) {
    try {
      return await this.prismaService.paciente.findUnique({
        where: {
          id: pacienteId
        }
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao adquirir os dados do paciente!")
    }
  }

  async getBySingleDate(usuarioId: number, date: string) {
    // Transformando em data
    const dateFormat = dayjs(date)

    try {
      return await this.prismaService.paciente.findMany({
        where: {
          data: {
            gte: dateFormat.hour(0).toISOString(),
            lt: dateFormat.hour(22).toISOString()
          },
          usuarioId: usuarioId
        }
      })
    } catch(e) {
      throw new InternalServerErrorException("Falha ao puxar pacientes por esta data!")
    }
  }
}