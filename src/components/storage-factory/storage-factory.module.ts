import { Module } from '@nestjs/common';
import { getDefaultStorageProvider } from './storage-factory.provider';
import { StorageFactoryService } from './storage-factory.service';
import { AwsS3 } from './storage-providers/aws-s3';
import { AzureBlob } from './storage-providers/azure-blob';

@Module({
  providers: [
    getDefaultStorageProvider(),
    StorageFactoryService,
    AwsS3,
    AzureBlob,
  ],
  exports: [StorageFactoryService],
})
export class StorageFactoryModule {}
