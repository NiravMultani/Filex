interface IBaseStorageProvider {
  // TODO: below are dummy types assigned. change when implement actual
  listAllFiles(): Promise<Array<string>>;
  downloadFile(id: string): Promise<string>;
  getPreSignedUrl(id: string): Promise<string>;
  uploadFile(): Promise<string>;
}
