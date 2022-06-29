import { Inject, Injectable } from '@nestjs/common';
import { CustomProvidesTokens } from '../../config';
import { IBaseStorageProvider } from './storage-providers/base-storage-provider.interface';

@Injectable()
export class StorageFactoryService {
  constructor(
    /** Dynamic cloud-service instance, passed from module providers */
    @Inject(CustomProvidesTokens.STORAGE_FACTORY_INSTANCE)
    private readonly instance: IBaseStorageProvider,
  ) {}

  async test(): Promise<string> {
    // this.instance.uploadFile()
    return 'asfdasf';
  }
}
