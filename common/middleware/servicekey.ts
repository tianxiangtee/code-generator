import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ServiceKeyChecker implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const servicekey = process.env.SERVICE_KEY;
    if (servicekey && req.headers.servicekey != servicekey) {
      return res.status(403).end('Unauthorized or invalid service key');
    } else {
      return next();
    }
  }
}
