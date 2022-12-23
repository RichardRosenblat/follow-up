import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { useContainer } from "class-validator";

dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    );
    app.enableShutdownHooks();
    app.enableCors()
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.listen(+(process.env.APP_PORT || 5000));
}
bootstrap();
