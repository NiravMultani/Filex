import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsS3 implements IBaseStorageProvider {
  private readonly logger = new Logger(AwsS3.name);

  private readonly s3: AWS.S3;

  constructor() {
    AWS.config.update({
      // TODO: get region from env
      region: 'ap-south-1',
    });
    this.s3 = new AWS.S3();
  }

  async listAllFiles(): Promise<string[]> {
    try {
      // const s3ListObjectParams: AWS.S3.ListObjectsRequest = {
      //   Bucket: '',

      // }
      const s3Objects = await this.s3
        .listObjects({
          Bucket: '',
        })
        .promise();
      return [];
    } catch (err) {
      Logger.error(err.message, `unable to  ${JSON.stringify(err)}`);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  downloadFile(id: string): string {
    throw new Error('Method not implemented.');
  }

  async getPreSignedUrl(id: string): Promise<string> {
    try {
      const signedUrlParams: IGetSignedUrlRequest = {

        ACL: 'public-read',
      }
      const preSignedUrl = await this.s3
        .getSignedUrlPromise('putObject', signedUrlParams)
        .then((signedUrl: string) => {
          Logger.log(`signed url generated successfully: ${signedUrl}`);
          return signedUrl;
        });
      return 'asdfsf';
    } catch (err) {
      Logger.error(
        err.message,
        `unable to generate the signed url: ${JSON.stringify(err)}`,
      );
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  uploadFile(): string {
    throw new Error('Method not implemented.');
  }
}
