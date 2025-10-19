"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
async function main() {
    const prisma = new prisma_1.PrismaClient();
    await prisma.user.upsert({
        where: { id: 'dev-user' },
        update: {},
        create: { id: 'dev-user', email: 'dev@example.com', password: 'dev' },
    });
    console.log('Seed completed');
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    process.exit(0);
});
//# sourceMappingURL=seed.js.map