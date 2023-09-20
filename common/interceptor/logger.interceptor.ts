import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { infoLogger } from "common/logger/winston-logger";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    public logger = new Logger()
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const now = Date.now();
        return next.handle().pipe(tap(() => this.afterRequest(now, context)));
    }

    private afterRequest(now:number, context) {
        const req = context.switchToHttp().getRequest();
        const route = req.route.path;
        const msg = `[${route}, ${req.method}] route + ${Date.now() - now} ms `
        this.logger.log(msg);
        infoLogger.info(msg)
    }
}
