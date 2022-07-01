import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CloudProviders,
  CustomProvidesTokens,
  EnvNamespaces,
} from '../../config';
import { exhaustiveCheck } from '../../helpers/exhaust-check';
import { AwsS3 } from './storage-providers/aws-s3';
import { AzureBlob } from './storage-providers/azure-blob';
import { IBaseStorageProvider } from './storage-providers/base-storage-provider.interface';

const logger = new Logger('StorageFactoryProvider');

export const getDefaultStorageProvider = (): Provider => {
  return {
    provide: CustomProvidesTokens.STORAGE_FACTORY_INSTANCE,

    inject: [ConfigService, AwsS3, AzureBlob],

    useFactory: (
      configService: ConfigService,
      awsS3: AwsS3,
      azureBlob: AzureBlob,
    ): IBaseStorageProvider => {
      const activeCloudProvider: CloudProviders = configService.get(
        `${EnvNamespaces.COMMON}.cloudProvider`,
      );
      logger.log(
        `Cloud provider found as ${activeCloudProvider}. Registering storage services specific to that provider.`,
      );

      switch (activeCloudProvider) {
        case CloudProviders.AWS:
          if (awsS3 === undefined) {
            logger.error(
              `AWS S3 not registered : value : ${awsS3} : type : ${typeof awsS3}`,
            );
            /* If you see this error than it means you're using a param in `useFactory` that you didn't injected through `inject` array */
            process.exit(1);
          }
          return awsS3;
        case CloudProviders.AZURE:
          if (azureBlob === undefined) {
            logger.error(
              `Azure blob not registered : value : ${azureBlob} : type : ${typeof azureBlob}`,
            );
            /* If you see this error than it means you're using a param in `useFactory` that you didn't injected through `inject` array */
            process.exit(1);
          }
          return azureBlob;
        default:
          exhaustiveCheck(activeCloudProvider);
          break;
      }
    },
  };
};
