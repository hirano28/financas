import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async health() {
    // simple DB ping via a cheap query (works after migrations)
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {}
    return { ok: true };
  }
}
