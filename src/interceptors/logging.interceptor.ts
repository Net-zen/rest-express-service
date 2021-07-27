import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    const { method, protocol } = req;
    const url = process.env.USE_FASTIFY === 'true' ? req.url : req.originalUrl;
    const query = JSON.stringify(req.query);

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        let body = '';
        if (req.body) {
          body = JSON.stringify(
            req.body.password ? { ...req.body, password: '******' } : req.body,
          );
        }
        const status = res.statusCode;
        const delay = Date.now() - now;
        Logger.log(
          `${protocol} | ${status} | [${method}] | ${req.ip} | ${url} - ${delay}ms
          query={${query}}
          body={${body}}`,
        );
      }),
    );
  }
}
