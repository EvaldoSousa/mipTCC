import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from './validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useBodyParser('json', { limit: '10mb' });
  app.useBodyParser('text');
  app.useBodyParser('raw');
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .addBasicAuth()
    .setTitle('TRU API')
    .setDescription('Sistema de notas fiscais eletrônicas')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
