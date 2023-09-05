import {
  Body,
  Controller,
  UseGuards,
  Post,
  UsePipes,
} from "@nestjs/common"
import { AuthGuard } from "../Global/auth.guard"
import { AuthRole } from "src/Auth/auth.decorator"
import { PacienteDto } from "./pacienteDto"

@Controller('paciente')
@AuthRole("USUARIO")
@UseGuards(AuthGuard)
export class PacienteController {

  @Post()
  async createPaciente(@Body() body: PacienteDto) {
    console.log(body)
    return {

    }
  }

}