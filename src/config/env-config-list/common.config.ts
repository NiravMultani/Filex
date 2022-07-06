import { registerAs } from '@nestjs/config';
import { EnvNamespaces } from '../env-config.tokens';

export default registerAs(EnvNamespaces.COMMON, () => {
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    cloudProvider: process.env.ACTIVE_CLOUD_SERVICE,
    apiKey: process.env.API_KEY,
  };
});
