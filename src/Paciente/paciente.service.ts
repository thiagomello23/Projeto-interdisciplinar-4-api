import {
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
          usuarioId: id
        }
      });
    } catch(e) {
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

  async getAllPacients(id: number) {
    try {
      return await this.prismaService.paciente.findMany({
        where: {
          usuarioId: id
        }
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