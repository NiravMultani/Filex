import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import commonConfigFactory from '../../../config/env-config-list/common.config';

@Injectable()
export class StorageProvidersService {
  constructor(
    @Inject(commonConfigFactory.KEY)
    private readonly commonConfiguration: ConfigType<
      typeof commonConfigFactory
    >,
  ) {}

  streamToBuffer = (readableStream: NodeJS.ReadableStream): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readableStream.on('data', (data: Buffer | string) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
    });
  };
}
