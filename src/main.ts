import { NestFactory } from '@nestjs/core';
// ta usando o NestFactory para criar uma aplicação
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())
//vai servir para validar as entradas (body), apartir da class 'CreateTeamMemberBody'

  await app.listen(3000);
}
bootstrap();
