import { Module } from '@nestjs/common';
import { getDefaultStorageProvider } from './storage-factory.provider';
import { StorageFactoryService } from './storage-factory.service';
import { AwsS3 } from './storage-providers/aws-s3';
import { AzureBlob } from './storage-providers/azure-blob';
import { StorageProvidersService } from './storage-providers/storage-providers.service';

@Module({
  providers: [
    getDefaultStorageProvider(),
    StorageFactoryService,
    AwsS3,
    AzureBlob,
    StorageProvidersService,
  ],
  exports: [StorageFactoryService],
})
export class StorageFactoryModule {}
