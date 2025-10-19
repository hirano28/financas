"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv_1 = require("dotenv");
const prisma_service_1 = require("./prisma/prisma.service");
async function bootstrap() {
    (0, dotenv_1.config)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    await prisma.enableShutdownHooks(app);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map