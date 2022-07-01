import { registerAs } from '@nestjs/config';
import { EnvNamespaces } from '../env-config.tokens';

export default registerAs(EnvNamespaces.AZURE, () => {
  return {
    containerName: process.env.CONTAINER_NAME,
    accessKey: process.env.AZURE_ACCESS_KEY,
    accountName: process.env.AZURE_ACCOUNT_NAME,
    uploadLocations: {
      base: 'media',
    },
  };
});
