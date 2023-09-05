import {
  Body,
  Controller,
  UseGuards,
  Post,
  UsePipes,
} from "@nestjs/common"
import { AuthGuard } from "../Global/auth.guard"
import { AuthRole } from "src/Auth/auth.decorator"
import { PacienteDto, PacienteSchema } from "./pacienteDto"
import { JoiValidationPipe } from "src/Global/joi-validation-pipe.pipe"

@Controller('paciente')
@UseGuards(AuthGuard)
export class PacienteController {

  @Post()
  @AuthRole("USUARIO")
  @UsePipes(new JoiValidationPipe(PacienteSchema))
  async createPaciente(@Body() body: PacienteDto) {
    console.log(body)
    return {
      msg: "Usuário cadastrado com sucesso!"
    }
  }
}