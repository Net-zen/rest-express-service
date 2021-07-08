import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getRepository } from 'typeorm';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function createAdmin() {
  const admin = {
    name: 'admin',
    login: 'admin',
    password: 'admin',
  };
  const userRepository = getRepository(User);
  const existedAdmin = await userRepository.findOne({ login: admin.login });
  if (!existedAdmin) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(admin.password, salt);
    const createdUser = await userRepository.create({
      ...admin,
      password,
    });
    await userRepository.save(createdUser);
  }
}

async function bootstrap() {
  const PORT = parseInt(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = yaml.load(
    readFileSync(join(__dirname, '../doc/api.yaml'), 'utf-8'),
  ) as OpenAPIObject;
  SwaggerModule.setup('/doc', app, swaggerDocument);
  await app.listen(PORT);
  await createAdmin();
}
bootstrap();
