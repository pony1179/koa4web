import { RouterModule } from '../interface/Router'
export class Layer implements RouterModule.Layer{
    methods: RouterModule.method[];
    path: RouterModule.path;
    middlewares: RouterModule.middleware[];
    constructor(path: string, methods: RouterModule.method[], middleware: RouterModule.middleware | RouterModule.middleware[]) {
        this.methods = methods;
        this.path = path;
        this.middlewares = Array.isArray(middleware) ? middleware : [middleware];
    }
    
    match(path: string, method: RouterModule.method) {
        // if (path === this.path && method === this.method) {
        //     return true;
        // }
        return false
    }
}