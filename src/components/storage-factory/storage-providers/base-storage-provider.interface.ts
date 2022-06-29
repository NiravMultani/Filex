import { Readable } from 'stream';

export interface IBaseStorageProvider {
  // TODO: below are dummy types assigned. change when implement actual
  listAllFiles(): Promise<Array<string>>;
  downloadFile(id: string): Promise<string>;
  getPreSignedUrl(id: string): Promise<string>;
  uploadFile(
    body: Buffer | Uint8Array | Blob | string | Readable,
    fileName: string,
  ): Promise<string>;
}
