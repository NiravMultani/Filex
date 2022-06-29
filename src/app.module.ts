import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsS3Module } from './components/aws-s3/aws-s3.module';
import { AzureBlobModule } from './components/azure-blob/azure-blob.module';
import { StorageModule } from './components/storage/storage.module';
import { StorageFactoryModule } from './components/storage-factory/storage-factory.module';

@Module({
  imports: [AwsS3Module, AzureBlobModule, StorageModule, StorageFactoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
