import { Module } from '@nestjs/common';
import { GlobalModule } from './Global/global.module';
import { UsuarioModulo } from './Usuario/usuario.module';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PacienteModulo } from './Paciente/paciente.module';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    }),
    UsuarioModulo,
    AuthModule,
    PacienteModulo
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}