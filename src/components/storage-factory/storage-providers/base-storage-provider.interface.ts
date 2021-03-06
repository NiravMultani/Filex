export interface IFileListDetails {
  filename: string;
  size: number;
  lastModified: Date;
}

export interface IBaseStorageProvider {
  listAllFiles(): Promise<IFileListDetails[]>;
  downloadFile(id: string): Promise<Buffer>;
  getPreSignedUrl(id: string): Promise<string>;
  uploadFile(body: Buffer, fileName: string): Promise<string>;
}
