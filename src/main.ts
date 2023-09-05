import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// Fazer rota para cadastrar paciente
// Fazer rota para pegar todos os pacientes com base em uma data especifica
// Fazer rota para pegar um paciente unico
// Rota de Autenticação com problema

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