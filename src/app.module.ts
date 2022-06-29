import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { StorageFactoryModule } from './components/storage-factory/storage-factory.module';
import { StorageModule } from './components/storage/storage.module';
import { validateEnv } from './config';
import awsConfig from './config/env-config-list/aws.config';

@Module({
  imports: [
    // Configure environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      load: [awsConfig],
    }),
    StorageModule,
    StorageFactoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
