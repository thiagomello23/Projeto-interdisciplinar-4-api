import * as Joi from "joi"

export const UsuarioSchema = Joi.object({
  id: Joi.number().integer().allow(),
  nome: Joi.string().required(),
  email: Joi.string().required(),
  senha: Joi.string().required(),
  telefone: Joi.string().required(),
  cargo: Joi.string().required()
})

export class UsuarioDto {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cargo: "USUARIO"|"ADMINISTRADOR";
}