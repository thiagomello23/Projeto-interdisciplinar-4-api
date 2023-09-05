import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// Fazer as validações dos dados usando Schemas validators
// Fazer a rota dos Pacientes

/*
Tabelas
  -- Usuário
  -- Paciente
  -- Procedimento

  -- Usuario 1 to * Paciente
  -- Usuario 1 to * Procedimento

  Usuário
    -- Nome
    -- Email
    -- Telefone
    -- Senha

  Paciente
    -- Nome
    -- Sobrenome
    -- Idade
    -- Procedimento
    -- Horario
    -- Valor
    -- Telefone
    -- usuario_id
  
  Procedimento
    -- Nome
    -- Valor
    -- usuario_id
*/
// Configurar Prisma, Dotenv, Jwt
// Lembrar do bug dos imports