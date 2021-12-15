import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  RequestTimeoutException
} from '@nestjs/common';
import { catchError, throwError, timeout, TimeoutError } from 'rxjs';

export class TimeoutInterceptor implements NestInterceptor {
  public intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      timeout(10000),
      catchError(err => {
        if (err instanceof TimeoutError) return throwError(() => new RequestTimeoutException());

        return throwError(() => err);
      })
    );
  }
}
