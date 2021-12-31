import { RouterModule } from '../interface/Router'
import { Layer } from './layer';
const methodConfig: RouterModule.method[] = ['GET', 'POST', 'PUT', 'DELETE']
export class Router implements RouterModule.RouterInterface{
    stack: RouterModule.Layer[] = [];
    // 该路由允许的方法
    allowedMethods: RouterModule.method[] = [];
    opts: RouterModule.opts;
    params: RouterModule.params = {};
    // get: RouterModule.get;
    constructor(opts: RouterModule.opts = {prefix:"/"}) {
        this.opts = opts;
        // methodConfig.forEach(ele => {
        //     this[ele.toLocaleLowerCase()] = (path: string | string[], middleware: RouterModule.middleware) => {
        //         this.register(path, ele, middleware);
        //     }
        // })
    }

    register(path: string | string[], methods: RouterModule.method[], middleware: RouterModule.middleware | RouterModule.middleware[], opts?: RouterModule.opts) {
        let router = this;
        if (Array.isArray(path)) {
            for (let i = 0; i < path.length; i++) {
                this.register.call(this, path[i], methods, middleware, opts)
            }
        }
        let middlewares = Array.prototype.slice.call(arguments, 2);

        // 管理本路由允许的method
        // if (methods.length === && this.allowedMethods.indexOf(method) === -1) {
        //     this.allowedMethods.push(method.toUpperCase() as RouterModule.method);
        // }
        
        let route = new Layer(path as string, methods, middlewares); 
        
        router.stack.push(route);
    }

    use(path: string | string[] | RouterModule.middleware): void
    use(path: string | string[] | RouterModule.middleware, ...middleware: any): void {
        if (typeof path === 'string') {
            this.register(path, [], middleware, )
        }
    }
}
