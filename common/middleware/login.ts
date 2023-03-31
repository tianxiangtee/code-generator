import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const HEADER_USERID = 'user_id';
const HEADER_USERNAME = 'username';
const HEADER_ORGANIZATION_ID = 'organization_id';

@Injectable()
export class LoginUser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers;
    if (header[HEADER_USERID]) {
      req.body['user_id'] = header[HEADER_USERID];
      req.query['user_id'] = header[HEADER_USERID];
    }
    if (header[HEADER_USERNAME]) {
      req.body['username'] = header[HEADER_USERNAME];
      req.query['username'] = header[HEADER_USERNAME];
    }
    if (header[HEADER_ORGANIZATION_ID]) {
      req.body['organization_id'] = header[HEADER_ORGANIZATION_ID];
      req.query['organization_id'] = header[HEADER_ORGANIZATION_ID];
    }

    next();
  }
}
