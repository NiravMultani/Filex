import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { StorageModule } from './components/storage/storage.module';
import { validateEnv } from './config';
import awsConfig from './config/env-config-list/aws.config';
import commonConfig from './config/env-config-list/common.config';

@Module({
  imports: [
    // Configure environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      load: [awsConfig, commonConfig],
    }),
    StorageModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
