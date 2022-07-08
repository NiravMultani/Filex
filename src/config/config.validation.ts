import { CloudProviders } from './consts';

function validateAWSEnv(config: Record<string, unknown>): void | never {
  const missingEnvVars = [];
  if (!config.AWS_ACCESS_KEY_ID) {
    missingEnvVars.push('AWS_ACCESS_KEY_ID');
  }
  if (!config.AWS_SECRET_ACCESS_KEY) {
    missingEnvVars.push('AWS_SECRET_ACCESS_KEY');
  }
  if (!config.AWS_REGION) {
    missingEnvVars.push('AWS_REGION');
  }

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Env variable ${missingEnvVars.toString()} is required for AWS`,
    );
  }
}

function validateAzureEnv(config: Record<string, unknown>) {
  const missingEnvVars = [];
  if (!config.AZURE_ACCOUNT_NAME) {
    missingEnvVars.push('AZURE_ACCOUNT_NAME');
  }
  if (!config.AZURE_ACCESS_KEY) {
    missingEnvVars.push('AZURE_ACCESS_KEY');
  }

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Env variable ${missingEnvVars.toString()} is required for Azure`,
    );
  }
}

export function validateEnv(config: Record<string, unknown>) {
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

  if (config.ACTIVE_CLOUD_SERVICE === CloudProviders.AWS) {
    validateAWSEnv(config);
  }

  if (config.ACTIVE_CLOUD_SERVICE === CloudProviders.AZURE) {
    validateAzureEnv(config);
  }

  if (!config.API_KEY || config.API_KEY.toString().length < 15) {
    throw new Error(
      'Env variable API_KEY is required and it should be atleast 15 characters',
    );
  }

  return config;
}
