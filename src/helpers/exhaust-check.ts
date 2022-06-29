import { Logger } from '@nestjs/common';

const logger = new Logger('exhaust-check');

export const exhaustiveCheck = (value: string): never => {
  logger.debug('exhaustiveCheck : unhandled value = ', value);
  throw new Error('unhandled variable value');
};
