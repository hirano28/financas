import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { HealthController } from './health.controller';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [],
  controllers: [AppController, HealthController, TransactionsController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
