import { SetMetadata } from "@nestjs/common"
import { Reflector } from '@nestjs/core';

type Role = "USUARIO"|"ADMINISTRADOR";

export const AuthRole = (arg: 'USUARIO'|'ADMINISTRADOR') => SetMetadata('auth', arg)