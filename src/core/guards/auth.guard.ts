import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';
import { Request } from 'express';
import commonConfigFactory from '../../config/env-config-list/common.config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    @Inject(commonConfigFactory.KEY)
    private readonly commonConfiguration: ConfigType<
      typeof commonConfigFactory
    >,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  validateRequest = (request: Request): boolean => {
    if (request.headers?.authorization === undefined) {
      throw new UnauthorizedException(null, 'Authorization header missing');
    }
    try {
      const verified: boolean = timingSafeEqual(
        Buffer.from(request.headers.authorization),
        Buffer.from(this.commonConfiguration.apiKey),
      );
      if (verified) {
        return true;
      }
      throw new UnauthorizedException(null, 'Invalid authorization value');
    } catch (err) {
      this.logger.warn(`Authentication error : ${err?.message || err}`);
      throw new UnauthorizedException(null, 'Invalid authorization value');
    }
  };
}
