import { DynamicModule, Module } from '@nestjs/common';
import { StorageFactoryService } from './storage-factory.service';
import { AwsS3 } from './storage-providers/aws-s3';

@Module({
  providers: [StorageFactoryService, AwsS3],
  exports: [StorageFactoryService],
})
export class StorageFactoryModule {}
