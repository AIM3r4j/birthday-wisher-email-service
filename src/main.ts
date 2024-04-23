import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { expressBind } from 'i18n-2';
import { localize } from './middleware';
import { ValidateInputPipe } from './middleware/validate';
import { nestwinstonLog, HttpPortLog } from './config/winstonLog';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./ssl/keyfile-encrypted.key'),
    cert: fs.readFileSync('./ssl/97580e4c070d1482.crt'),
    ca: [fs.readFileSync('./ssl/gd1.crt')],
    passphrase: 'encrypted',
  };
  const NestFactoryOptions = { logger: nestwinstonLog };

  if (process.env.SSL == 'true') {
    // enable SSL
    NestFactoryOptions['httpsOptions'] = httpsOptions;
  }

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    NestFactoryOptions,
  );

  // global prefix
  app.setGlobalPrefix('bwesapi');

  expressBind(app, { locales: ['en'] });

  app.use(localize);

  app.enableCors();

  app.useGlobalPipes(new ValidateInputPipe());

  await app.listen(process.env.PORT || 3000, () =>
    HttpPortLog(process.env.PORT || 3000),
  );
}

bootstrap();
