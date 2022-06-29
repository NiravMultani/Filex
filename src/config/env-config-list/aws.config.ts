import { registerAs } from '@nestjs/config';
import { EnvNamespaces } from '../env-config.tokens';

export default registerAs(EnvNamespaces.AWS, () => {
  return {
    bucket: process.env.AWS_BUCKET,
    region: process.env.AWS_REGION,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    uploadLocations: {
      base: 'media',
    },
  };
});
