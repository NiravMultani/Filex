import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { Readable } from 'stream';
import awsConfigFactory from '../../../config/env-config-list/aws.config';
import {
  IBaseStorageProvider,
  IFileListDetails,
} from './base-storage-provider.interface';

@Injectable()
export class AwsS3 implements IBaseStorageProvider {
  private readonly logger = new Logger(AwsS3.name);

  private readonly s3: AWS.S3;

  constructor(
    @Inject(awsConfigFactory.KEY)
    private readonly awsConfiguration: ConfigType<typeof awsConfigFactory>,
  ) {
    AWS.config.update({
      region: this.awsConfiguration.region,
    });
    this.s3 = new AWS.S3();
  }

  listAllFiles = async (): Promise<IFileListDetails[]> => {
    try {
      const s3Objects = await this.s3
        .listObjects({
          Bucket: this.awsConfiguration.bucket,
        })
        .promise();
      this.logger.debug(
        `Objects in ${this.awsConfiguration.bucket} are, \n ${JSON.stringify(
          s3Objects,
          null,
          2,
        )}`,
      );
      return s3Objects.Contents.map((object) => {
        return {
          filename: object.Key,
          size: object.Size,
          lastModified: object.LastModified,
        };
      });
    } catch (err) {
      this.logger.error(`unable to list all files ${JSON.stringify(err)}`);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  };

  downloadFile = async (id: string): Promise<Buffer> => {
    try {
      const fileData = await this.s3
        .getObject({
          Bucket: this.awsConfiguration.bucket,
          Key: id,
        })
        .promise();
      this.logger.debug('Download file respnose : ', fileData);
      return fileData.Body as Buffer;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  };

  getPreSignedUrl = async (id: string): Promise<string> => {
    try {
      const signedUrlParams: IGetSignedUrlRequest = {
        Bucket: this.awsConfiguration.bucket,
        Key: id,
      };
      const signedUrl = await this.s3.getSignedUrl(
        'getObject',
        signedUrlParams,
      );
      this.logger.log(`signed url generated successfully: ${signedUrl}`);
      return signedUrl;
    } catch (err) {
      this.logger.error(
        `unable to generate the signed url: ${JSON.stringify(err)}`,
      );
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  };

  uploadFile = async (
    body: Buffer | Uint8Array | Blob | string | Readable,
    fileName: string,
  ): Promise<string> => {
    try {
      const updateResponse = await this.s3
        .putObject({
          Bucket: this.awsConfiguration.bucket,
          Body: body,
          Key: fileName,
        })
        .promise();
      this.logger.debug(
        `upload response : ${JSON.stringify(updateResponse, null, 2)}`,
      );
      // return URL location of uploaded file
      return `https://${this.awsConfiguration.bucket}.s3-${this.s3.config.region}.amazonaws.com/${fileName}`;
    } catch (err) {
      this.logger.error(`unable to upload file to s3: ${JSON.stringify(err)}`);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  };
}
