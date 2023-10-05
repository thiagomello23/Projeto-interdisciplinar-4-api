import {
  Body,
  Controller,
  UseGuards,
  Post,
  UsePipes,
  Req,
  Get,
  Param,
  Put,
  Query
} from "@nestjs/common"
import { AuthGuard } from "../Global/auth.guard"
import { AuthRole } from "src/Auth/auth.decorator"
import { PacienteDto, PacienteSchema } from "./pacienteDto"
import { JoiValidationPipe } from "src/Global/joi-validation-pipe.pipe"
import { PacienteService } from "./paciente.service"

@Controller('paciente')
@UseGuards(AuthGuard)
export class PacienteController {

  constructor(
    private pacienteService: PacienteService
  ){}

  @Post()
  @AuthRole("USUARIO")
  @UsePipes(new JoiValidationPipe(PacienteSchema))
  async createPaciente(@Body() body: PacienteDto, @Req() request: any) {
    const tokenData: PayloadJwt = request.auth;
    // Tratar data de ano-mes-dia para ISO Format
    // Fazr as validações necessárias do dia
    try {
      await this.pacienteService.createPaciente(+tokenData.id, body);
    } catch(e) {
      throw e;
    }
    return {
      msg: "Usuário cadastrado com sucesso!"
    }
  }

  @Put()
  @AuthRole("USUARIO")
  @UsePipes(new JoiValidationPipe(PacienteSchema))
  async updatePacient(@Body() body: PacienteDto) {
    try {
      await this.pacienteService.updatePacient(body)
      return {
        msg: "Paciente editado com sucesso!"
      }
    } catch(e) {
      throw e;
    }
  }

  @Get()
  @AuthRole("USUARIO")
  async getAllPacients(@Req() request) {
    const tokenData: PayloadJwt = request.auth;
    try {
      return await this.pacienteService.getAllPacients(+tokenData.id)
    } catch(e) {
      throw e;
    }
  }

  @Get(":date")
  @AuthRole("USUARIO")
  async getAllPacientsByDate(@Req() request, @Param("date") date: Date) {
    const tokenData: PayloadJwt = request.auth;
    try { 
      return await this.pacienteService.getAllPacientsByDate(+tokenData.id, date)
    } catch(e) {
      throw e;
    }
  }

  @Get("date")
  @AuthRole("USUARIO")
  async getBySingleDate(@Req() request, @Query() params: PacienteQueryParam) {
    const tokenData: PayloadJwt = request.auth;
    try {
      return await this.pacienteService.getBySingleDate(+tokenData.id, params.date)
    } catch(e) {
      throw e;
    }
  }

  @Get(':id')
  @AuthRole("USUARIO")
  async getSinglePacient(@Req() request, @Param('id') id: number) {
    try {
      return await this.pacienteService.getSinglePacient(+id)
    } catch(e) {
      throw e;
    }
  }
}