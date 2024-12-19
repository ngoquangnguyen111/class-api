import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let devMessage = 'Something went wrong.';
    let data = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      
      if (typeof errorResponse === 'string') {
        devMessage = errorResponse;
      } else if (typeof errorResponse === 'object') {
        const { message, ...rest } = errorResponse as Record<string, any>;
        devMessage = Array.isArray(message) ? message.join(', ') : message;
        data = rest;
      }
    }

    // Format Exception Response
    response.status(status).json({
      errorCode: status === HttpStatus.BAD_REQUEST ? 'BAD_REQUEST_INPUT' : errorCode,
      devMessage,
      data,
      
    });
  }
}