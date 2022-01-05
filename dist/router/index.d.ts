import { RouterModule } from '../interface/Router';
import { AppModule } from '../interface/App';
export declare class Router implements RouterModule.RouterInterface {
    stack: RouterModule.Layer[];
    allowedMethods: RouterModule.method[];
    opts: RouterModule.opts;
    params: RouterModule.params;
    constructor(opts?: RouterModule.opts);
    register(path: string | string[], methods: RouterModule.method[], ...middleware: any): void;
    use(path: string | string[] | RouterModule.middleware): void;
    get(path: string | string[], ...middleware: any): void;
    post(path: string | string[], ...middleware: any): void;
    put(path: string | string[], ...middleware: any): void;
    delete(path: string | string[], ...middleware: any): void;
    routes(): (ctx: AppModule.Context, next: AppModule.middleware) => Promise<void>;
}
//# sourceMappingURL=index.d.ts.map