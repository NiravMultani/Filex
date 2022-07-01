import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { StorageModule } from './components/storage/storage.module';
import { validateEnv } from './config';
import awsConfig from './config/env-config-list/aws.config';
import azureConfig from './config/env-config-list/azure.config';
import commonConfig from './config/env-config-list/common.config';

@Module({
  imports: [
    // Configure environment variables into config service
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      load: [awsConfig, commonConfig, azureConfig],
    }),
    StorageModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
