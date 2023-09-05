import {
  Body,
  Controller,
  Post,
} from "@nestjs/common"
import { AuthService } from "./auth.service";
import { AuthDto } from "./authDto";

@Controller("auth")
export class AuthController {

  constructor(
    private authService: AuthService
  ){}
  
  @Post()
  async login(@Body() body: AuthDto) {
    try {
      return {
        token: await this.authService.login(body)
      }
    } catch(e) {
      throw e;
    }
  }
  
}