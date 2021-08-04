import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Section Start
  // Docs and API Playground...
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PieDAO API')
    .setDescription('The Official PieDAO Backend Engine')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/playground', app, swaggerDocument);
  // Swagger Section End

  await app.listen(3000);
}
bootstrap();
