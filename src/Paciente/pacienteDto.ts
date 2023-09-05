import * as Joi from "joi"

export const PacienteSchema = Joi.object({
  id: Joi.number().integer().allow(),
  nome: Joi.string().required(),
  sobrenome: Joi.string().required(),
  procedimento: Joi.string().required(),
  telefone: Joi.string().required(),
  idade: Joi.number().integer().required(),
  horario: Joi.number().integer().required(),
  usuarioId: Joi.number().integer().allow(),
  data: Joi.date().required()
})


export class PacienteDto {
  id: number;
  nome: string
  sobrenome: string
  telefone: string
  idade: number;
  data: Date;
  procedimento: string
  horario: number;
  usuarioId: number;
}