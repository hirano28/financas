import { PrismaService } from './prisma/prisma.service';
export declare class TransactionsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        description: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
        accountId: string | null;
        categoryId: string | null;
    }[]>;
    create(body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        description: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
        accountId: string | null;
        categoryId: string | null;
    }>;
}
