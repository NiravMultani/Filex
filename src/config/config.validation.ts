export function validateEnv(config: Record<string, unknown>) {
  if (!config.PORT) {
    throw new Error('PORT is required');
  }

  // TODO: check if ACTIVE_CLOUD_SERVICE is there

  // TODO: based on cloud service validate required fields

  return config;
}
