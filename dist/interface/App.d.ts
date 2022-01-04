import { RouterModule } from './Router';
import { RequestOption } from '@types/request4browser';
export declare namespace AppModule {
    interface App {
        middlewares: middleware[];
        use(handle: middleware): void;
    }
    type middleware = (ctx: Object, next: Function) => void;
    interface Context {
        req: RequestOption;
        method: RouterModule.method;
        path: string;
        payload?: any;
        query: any;
        params: any;
    }
}
//# sourceMappingURL=App.d.ts.map