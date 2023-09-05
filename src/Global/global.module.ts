import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AuthGuard } from "./auth.guard";

@Global()
@Module({
  exports: [PrismaService, AuthGuard],
  providers: [PrismaService, AuthGuard],
})
export class GlobalModule {}