import * as Joi from "joi"

export const ProcedimentoSchema = Joi.object({
  id: Joi.number().integer().allow(),
  nome: Joi.string().required(),
  valor: Joi.number().required(),
  usuarioId: Joi.number().integer().allow(),
})

export class ProcedimentoDto {
  id?: number;
  nome: string;
  valor: number;
  usuarioId?: number;
}