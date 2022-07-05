import {
  BlobItem,
  BlobServiceClient,
  ContainerClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import azureConfigFactory from '../../../config/env-config-list/azure.config';
import {
  IBaseStorageProvider,
  IFileListDetails,
} from './base-storage-provider.interface';

@Injectable()
export class AzureBlob implements IBaseStorageProvider {
  private readonly logger = new Logger(AzureBlob.name);

  private readonly blobServiceClient: BlobServiceClient;

  private readonly containerClient: ContainerClient;

  constructor(
    @Inject(azureConfigFactory.KEY)
    private readonly azureConfiguration: ConfigType<typeof azureConfigFactory>,
  ) {
    this.blobServiceClient = new BlobServiceClient(
      `https://${this.azureConfiguration.accountName}.blob.core.windows.net`,
      new StorageSharedKeyCredential(
        this.azureConfiguration.accountName,
        this.azureConfiguration.accessKey,
      ),
    );
    this.containerClient = this.blobServiceClient.getContainerClient(
      this.azureConfiguration.containerName,
    );
  }

  private streamToBuffer(
    readableStream: NodeJS.ReadableStream,
  ): Promise<Buffer> {
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
  }

  listAllFiles = async (): Promise<IFileListDetails[]> => {
    const list: BlobItem[] = [];

    for await (const blob of this.containerClient.listBlobsFlat()) {
      list.push(blob);
    }
    this.logger.debug(
      `Objects in ${
        this.azureConfiguration.containerName
      } are, \n ${JSON.stringify(list, null, 2)}`,
    );
    // TODO: update return
    return [];
  };

  downloadFile = async (id: string): Promise<Buffer> => {
    const blockBlobClient = this.containerClient.getBlockBlobClient(id);
    const downloadBlockBlobResponse = await blockBlobClient.download();
    const fileBuffer = await this.streamToBuffer(
      downloadBlockBlobResponse.readableStreamBody,
    );
    return fileBuffer;
  };

  getPreSignedUrl = async (id: string): Promise<string> => {
    const blockBlobClient = this.containerClient.getBlockBlobClient(id);
    const signedUrl = await blockBlobClient.generateSasUrl({
      expiresOn: new Date(),
    });
    return signedUrl;
  };

  uploadFile = async (
    body: Buffer | Blob,
    fileName: string,
  ): Promise<string> => {
    const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
    const uploadResult = await blockBlobClient.uploadData(body);
    this.logger.debug(
      'Azure upload result : ',
      JSON.stringify(uploadResult, null, 2),
    );
    // TODO: update return
    return 'asdf';
  };
}
