import { AppModule } from './typings/App';
import Context from './lib/context';
export { Router } from './router';
export default class Application implements AppModule.App {
    middlewares: AppModule.middleware[];
    constructor();
    use(handle: AppModule.middleware | AppModule.middleware[]): void;
    callback: (ctx: AppModule.Context) => Promise<void>;
    /**
     * 处理请求
     * @param req
     */
    handleRequest(req: AppModule.RequestImpl): void;
    /**
     * 启动监听
     */
    listen(): void;
}
//# sourceMappingURL=index.d.ts.map