import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();

    return next.handle().pipe(
      map((response: ApiSuccessResponse) => {
        // Set HTTP status code from response
        res.status(response.statusCode ?? 200);
        return response;
      }),
    );
  }
}
