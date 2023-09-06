import {
  Controller,
  UseGuards,
  Post,
  Body,
  UsePipes,
  Req,
  Get,
  Put
} from "@nestjs/common"
import { ProcedimentoService } from "./procedimento.service";
import { AuthGuard } from "src/Global/auth.guard";
import { AuthRole } from "src/Auth/auth.decorator";
import { JoiValidationPipe } from "src/Global/joi-validation-pipe.pipe";
import { ProcedimentoDto, ProcedimentoSchema } from "./procedimentoDto";

@Controller("procedimento")
@UseGuards(AuthGuard)
export class ProcedimentoController {

  constructor(
    private procedimentoService: ProcedimentoService
  ){}

  @Post()
  @AuthRole("USUARIO")
  @UsePipes(new JoiValidationPipe(ProcedimentoSchema))
  async createProcedimento(@Body() body: ProcedimentoDto, @Req() request) {
    const tokenData: PayloadJwt = request.auth;
    try {
      await this.procedimentoService.createProcedimento(+tokenData.id, body)
      return {
        msg: "Procedimento cadastrado com sucesso!"
      }
    } catch(e) {
      throw e;
    }
  }

  @Get()
  @AuthRole("USUARIO")
  async getAllProcedimentos(@Req() request) {
    const tokenData: PayloadJwt = request.auth;
    try {
      return await this.procedimentoService.getAllProcedimentos(+tokenData.id)
    } catch(e) {
      throw e;
    }
  }

  @Put()
  @AuthRole("USUARIO")
  @UsePipes(new JoiValidationPipe(ProcedimentoSchema))
  async updateProcedimento(@Req() request, @Body() body: ProcedimentoDto) {
    try {
      this.procedimentoService.updateProcedimento(body)
      return {
        msg: "Procedimento editado com sucesso!"
      }
    } catch(e) {
      throw e;
    }
  }
}