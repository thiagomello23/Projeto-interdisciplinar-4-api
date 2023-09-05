import { Reflector } from '@nestjs/core';

type Role = "USUARIO"|"ADMINISTRADOR";

export const AuthRole = Reflector.createDecorator<Role>();