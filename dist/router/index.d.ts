import { RouterModule } from '../interface/Router';
export declare class Router implements RouterModule.RouterInterface {
    stack: RouterModule.Layer[];
    allowedMethods: RouterModule.method[];
    opts: RouterModule.opts;
    params: RouterModule.params;
    constructor(opts?: RouterModule.opts);
    register(path: string | string[], methods: RouterModule.method[], middleware: RouterModule.middleware | RouterModule.middleware[]): void;
    use(path: string | string[] | RouterModule.middleware): void;
    routes(): void;
}
//# sourceMappingURL=index.d.ts.map