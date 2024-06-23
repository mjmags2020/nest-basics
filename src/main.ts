import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ImATeapotException } from "@nestjs/common";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { AllExceptionsFilter } from "./all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

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
      } else {
        console.log("blocked cors for:", origin);
        callback(new ImATeapotException("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
