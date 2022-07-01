import { CloudProviders } from './consts';

export function validateEnv(config: Record<string, unknown>) {
  if (!config.PORT) {
    throw new Error('Env variable PORT is required');
  }

  if (
    !config.ACTIVE_CLOUD_SERVICE ||
    ![CloudProviders.AWS, CloudProviders.AZURE].includes(
      config.ACTIVE_CLOUD_SERVICE as CloudProviders,
    )
  ) {
    throw new Error(
      `Env variable ACTIVE_CLOUD_SERVICE is required and it can be 'aws' or 'azure'`,
    );
  }

  // TODO: based on cloud service validate required fields
  if (config.ACTIVE_CLOUD_SERVICE === CloudProviders.AWS) {
  }

  return config;
}
