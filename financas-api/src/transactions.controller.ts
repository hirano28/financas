import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      take: 50,
    });
  }

  @Post()
  async create(@Body() body: any) {
    // Minimal validation placeholder
    const { date, description, amount, type } = body;
    return this.prisma.transaction.create({
      data: {
        date: new Date(date),
        description,
        amount,
        type,
        user: { connect: { id: 'dev-user' } },
      },
    });
  }
}
