import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = yaml.load(
    readFileSync(join(__dirname, '../doc/api.yaml'), 'utf-8'),
  ) as OpenAPIObject;
  SwaggerModule.setup('/doc', app, swaggerDocument);
  await app.listen(PORT);
}
bootstrap();
