import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { EnvNamespaces } from './config';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const configService = app.get(ConfigService);
  await app.listen(configService.get(`${EnvNamespaces.COMMON}.port`));

  logger.log(`Server listening on ${await app.getUrl()}`);
}
bootstrap();
