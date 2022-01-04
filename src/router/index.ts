import { RouterModule } from '../interface/Router'
import { AppModule } from '../interface/App'
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

    register(path: string | string[], methods: RouterModule.method[], middleware: RouterModule.middleware | RouterModule.middleware[]) {
        let router = this;
        if (Array.isArray(path)) {
            for (let i = 0; i < path.length; i++) {
                this.register.call(this, path[i], methods, middleware)
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
        if (path && (typeof path === 'string' || Array.isArray(path))) {
            // let middlewares = Array.prototype.slice.call(arguments, 1);
            this.register(path, [], middleware);
        } else {
            // let middlewares = Array.prototype.slice.call(arguments);
            this.register('/', [], middleware);
        }
    }

    get(path: string | string[], ...middleware: any) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/'
        }
        this.register(path, ['GET'], middleware);
    }

    post(path: string | string[], ...middleware: any) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/'
        }
        this.register(path, ['POST'], middleware);
    }

    put(path: string | string[], ...middleware: any) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/'
        }
        this.register(path, ['PUT'], middleware);
    }

    delete(path: string | string[], ...middleware: any) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/'
        }
        this.register(path, ['DELETE'], middleware);
    }

    routes(){
        let router = this;
        function dispatch(ctx: AppModule.Context){
            let method = ctx.method
            router.stack.forEach(route => {
                // route.
            });
            // for (this.)
        }
    }
}
