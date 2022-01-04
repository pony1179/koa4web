import { RouterModule } from '../interface/Router';
export declare class Layer implements RouterModule.Layer {
    methods: RouterModule.method[];
    path: RouterModule.path;
    middlewares: RouterModule.middleware[];
    constructor(path: string, methods: RouterModule.method[], middleware: RouterModule.middleware | RouterModule.middleware[]);
    match(path: string, method: RouterModule.method): boolean;
}
//# sourceMappingURL=layer.d.ts.map