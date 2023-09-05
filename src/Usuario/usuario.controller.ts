import { 
  Body,
  Controller,
  Get,
  Post,
  Put,
  HttpException,
  BadRequestException,
  UseGuards
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto } from "./usuarioDto";
import { AuthGuard } from "src/Auth/auth.guard";
import { AuthRole } from "src/Auth/auth.decorator";
import { PublicRoute } from "src/public.decorator";

// Rota protegida
// Para criar usuário ele precisa estar logado e precisa ser um Administrador
@Controller("usuario")
@AuthRole("ADMINISTRADOR")
@UseGuards(AuthGuard)
export class UsuarioController {

  constructor(private usuarioService: UsuarioService) {}
  
  // Cria um usuário com um cargo
  @Post()
  @PublicRoute()
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

  // Pegar todos os usuários
  @Get("all")
  async getAllUsers() {
    try {
      return await this.usuarioService.getAllUsers()
    } catch(e) {
      throw e;
    }
  }
}