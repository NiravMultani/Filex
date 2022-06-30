import { Module } from '@nestjs/common';
import { StorageFactoryModule } from '../storage-factory/storage-factory.module';
import { StorageController } from './storage.controller';

@Module({
  controllers: [StorageController],
  imports: [StorageFactoryModule],
})
export class StorageModule {}
