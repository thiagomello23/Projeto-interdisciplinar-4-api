import {
  Module
} from "@nestjs/common"
import { ProcedimentoController } from "./procedimento.controller"
import { ProcedimentoService } from "./procedimento.service"

@Module({
  controllers: [ProcedimentoController],
  providers: [ProcedimentoService]
})
export class ProcedimentoModule {}