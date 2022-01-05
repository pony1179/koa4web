import { RequestImpl, ResponseImpl } from 'request4browser';
export declare namespace AppModule {
    interface App {
        middlewares: middleware[];
        use(handle: middleware): void;
    }
    type middleware = (ctx: Context, next: Function) => void;
    interface Context {
        req: RequestImpl;
        res: ResponseImpl;
    }
}
//# sourceMappingURL=App.d.ts.map