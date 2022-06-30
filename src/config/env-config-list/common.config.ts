import { registerAs } from '@nestjs/config';
import { EnvNamespaces } from '../env-config.tokens';

export default registerAs(EnvNamespaces.COMMON, () => {
  return {
    env: process.env.NODE_ENV,
    cloudProvider: process.env.ACTIVE_CLOUD_SERVICE,
  };
});
