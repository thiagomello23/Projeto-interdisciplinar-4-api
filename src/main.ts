import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();

// Rota para cadastrar procedimento
// Rota para pegar todos os procedimentos
// Rota para editar os procedimentos

// Rota de Autenticação com problema
// Falta as validações da rota dos pacientes com relação ao horario

// Todo internalServerError derruba o servidor Nestj? verificar.

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