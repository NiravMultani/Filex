export function validateEnv(config: Record<string, unknown>) {
  if (!config.PORT) {
    throw new Error('PORT is required');
  }
  return config;
}
