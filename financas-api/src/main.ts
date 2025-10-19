import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
