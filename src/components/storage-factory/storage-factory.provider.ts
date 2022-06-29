import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CloudProviders,
  CustomProvidesTokens,
  EnvNamespaces,
} from '../../config';
import { exhaustiveCheck } from '../../helpers/exhaust-check';
import { AwsS3 } from './storage-providers/aws-s3';
import { IBaseStorageProvider } from './storage-providers/base-storage-provider.interface';

const logger = new Logger('StorageFactoryProvider');

export const getDefaultStorageProvider = (): Provider => {
  return {
    provide: CustomProvidesTokens.STORAGE_FACTORY_INSTANCE,

    inject: [ConfigService],

    useFactory: (
      configService: ConfigService,
      awsS3: AwsS3,
    ): IBaseStorageProvider => {
      const activeCloudProvider: CloudProviders = configService.get(
        `${EnvNamespaces.COMMON}.cloudProvider`,
      );
      logger.log(
        `Cloud provider found as ${activeCloudProvider}. Registering storage services specific to that provider.`,
      );

      switch (activeCloudProvider) {
        case CloudProviders.AWS:
          return awsS3;
        case CloudProviders.AZURE:
          break;
        default:
          exhaustiveCheck(activeCloudProvider);
          break;
      }
    },
  };
};
