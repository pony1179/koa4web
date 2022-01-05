import { RequestImpl } from 'request4browser';
import { AppModule } from './interface/App';
export { Router } from './router';
export default class Application implements AppModule.App {
    middlewares: AppModule.middleware[];
    constructor();
    use(handle: AppModule.middleware | AppModule.middleware[]): void;
    callback(ctx: AppModule.Context): void;
    /**
     * 处理请求
     * @param req
     */
    handleRequest(req: RequestImpl): void;
    /**
     * 启动监听
     */
    listen(): void;
}
//# sourceMappingURL=index.d.ts.map