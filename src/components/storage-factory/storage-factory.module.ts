import { Module } from '@nestjs/common';
import { getDefaultStorageProvider } from './storage-factory.provider';
import { StorageFactoryService } from './storage-factory.service';
import { AwsS3 } from './storage-providers/aws-s3';

@Module({
  providers: [getDefaultStorageProvider(), StorageFactoryService, AwsS3],
  exports: [StorageFactoryService],
})
export class StorageFactoryModule {}
