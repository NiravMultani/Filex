interface IGetSignedUrlRequest {
  Bucket: string;
  Key: string;
  Expires?: number;
  ACL?: string;
}
