import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as ExceptionFilterBase,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { errorMessage } from 'src/lib/utils/helper.utils';

@Catch()
export class ExceptionFilter implements ExceptionFilterBase {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();

    // Check if exception is an instance of HttpException
    const isHttpException = exception instanceof HttpException;

    // Extract status code
    let statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract error message
    const message = errorMessage(exception);

    // If error code not present in message
    if (!message.includes(':')) {
      res.status(statusCode).send({
        success: false,
        statusCode,
        message,
      } as ApiResponse);
      return;
    }

    const [code, msg] = message.replace(':', '>>').split('>>');
    statusCode = Number(code) || 500;

    // Send response
    res.status(statusCode).send({
      success: false,
      statusCode,
      message: msg,
    } as ApiResponse);
  }
}
