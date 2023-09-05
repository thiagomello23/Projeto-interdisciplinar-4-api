import { 
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto, UsuarioSchema } from "./usuarioDto";
import { AuthGuard } from "../Global/auth.guard";
import { AuthRole } from "src/Auth/auth.decorator";
import { PublicRoute } from "../Global/public.decorator";
import { JoiValidationPipe } from "../Global/joi-validation-pipe.pipe";

// Rota protegida
// Para criar usuário ele precisa estar logado e precisa ser um Administrador
@Controller("usuario")
@AuthRole("ADMINISTRADOR")
@UseGuards(AuthGuard)
export class UsuarioController {

  constructor(private usuarioService: UsuarioService) {}
  
  @Post()
  @PublicRoute()
  @UsePipes(new JoiValidationPipe(UsuarioSchema))
  async createUser(@Body() body: UsuarioDto) {
    try {
      await this.usuarioService.createUser(body);
    } catch(e) {
      throw e;
    }
    return {
      msg: "Usuário cadastrado com sucesso!"
    };
  }

  @Get("all")
  async getAllUsers() {
    try {
      return await this.usuarioService.getAllUsers()
    } catch(e) {
      throw e;
    }
  }
}