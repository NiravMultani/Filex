import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureBlobModule } from './components/cloud-services/azure/azure-blob/azure-blob.module';
import { AwsS3Module } from './components/cloud-services/aws/aws-s3/aws-s3.module';
import { FileManagerModule } from './components/file-manager/file-manager.module';

@Module({
  imports: [AzureBlobModule, AwsS3Module, FileManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
