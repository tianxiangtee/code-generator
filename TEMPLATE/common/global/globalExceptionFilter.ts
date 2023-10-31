import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { errorLogger } from 'common/logger/winston-logger';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Log all error
    errorLogger.error(exception.toString());
    
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse() as string;
      response.status(status).json({ statusCode: status, message });
    } else {
      // Log the unhandled exception
      // errorLogger.error(exception);

      // Send a generic error response
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
