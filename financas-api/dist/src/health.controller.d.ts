import { PrismaService } from './prisma/prisma.service';
export declare class HealthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    health(): Promise<{
        ok: boolean;
    }>;
}
