import { Readable } from 'stream';

export interface IBaseStorageProvider {
  // TODO: below are dummy types assigned. change when implement actual
  listAllFiles(): Promise<Array<string>>;
  downloadFile(id: string): Promise<Buffer>;
  getPreSignedUrl(id: string): Promise<string>;
  uploadFile(
    body: Buffer | Blob, // common between both azure and aws
    // body: Buffer | Uint8Array | Blob | string | Readable, // from aws
    fileName: string,
  ): Promise<string>;
}
