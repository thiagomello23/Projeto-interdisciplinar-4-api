import {
  Controller,
  UseGuards
} from "@nestjs/common"
import { AuthGuard } from "src/Auth/auth.guard"
import { AuthRole } from "src/Auth/auth.decorator"

@Controller('paciente')
@AuthRole("USUARIO")
@UseGuards(AuthGuard)
export class PacienteController {

}