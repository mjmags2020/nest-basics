"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const all_exceptions_filter_1 = require("./all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(httpAdapter));
    app.setGlobalPrefix("api");
    var whitelist = ["http://localhost:3000", "localhost:3000"];
    app.enableCors({
        origin: function (origin, callback) {
            console.log("origin");
            if (!origin) {
                callback(null, true);
                return;
            }
            if (whitelist.includes(origin)) {
                console.log("allowed cors for:", origin);
                callback(null, true);
            }
            else {
                console.log("blocked cors for:", origin);
                callback(new common_1.ImATeapotException("Not allowed by CORS"), false);
            }
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map