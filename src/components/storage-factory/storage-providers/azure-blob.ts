import {
  BlobSASPermissions,
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

  /** When creating signed URL, this will be the permissions given while accessing the file */
  private readonly fileSharingPermissions: BlobSASPermissions;

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

    this.fileSharingPermissions = new BlobSASPermissions();
    this.fileSharingPermissions.read = true;
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
    const list: IFileListDetails[] = [];

    for await (const blob of this.containerClient.listBlobsFlat()) {
      list.push({
        filename: blob.name,
        size: blob.properties.contentLength,
        lastModified: blob.properties.lastModified,
      });
    }
    return list;
  };

  downloadFile = async (id: string): Promise<Buffer> => {
    const blockBlobClient = this.containerClient.getBlockBlobClient(id);
    const downloadBlockBlobResponse = await blockBlobClient.download();
    return this.streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
  };

  getPreSignedUrl = async (id: string): Promise<string> => {
    const blockBlobClient = this.containerClient.getBlockBlobClient(id);
    const currentDate = new Date();
    // TODO: get expiry time from config
    const expiryDate = new Date(currentDate.getTime() + 30 * 60 * 1000);

    return blockBlobClient.generateSasUrl({
      expiresOn: expiryDate,
      permissions: this.fileSharingPermissions,
    });
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
    return `https://${this.azureConfiguration.accountName}.blob.core.windows.net/${this.azureConfiguration.containerName}/${fileName}`;
  };
}
