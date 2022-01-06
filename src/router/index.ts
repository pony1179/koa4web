import { RouterModule } from '../interface/Router'
import { AppModule } from '../interface/App'
import { Layer } from './layer';
import compose from '../lib/compose';


export class Router implements RouterModule.RouterInterface{
    stack: RouterModule.Layer[] = [];
    // 该路由允许的方法
    allowedMethods: RouterModule.method[] = [];
    opts: RouterModule.opts;
    params: RouterModule.params = {};
    constructor(opts: RouterModule.opts = {prefix:"/"}) {
        this.opts = opts;
    }

    register(path: string | string[], methods: RouterModule.method[], ...middleware: any) {
        let router = this;
        if (Array.isArray(path)) {
            for (let i = 0; i < path.length; i++) {
                this.register.call(this, path[i], methods, middleware)
            }
        }
        let middlewares = middleware;
        let route = new Layer(path as string, methods, middlewares); 
        router.stack.push(route);
    }

    use(path: string | string[] | RouterModule.middleware): void
    use(path: string | string[] | RouterModule.middleware, ...middleware: any): void {
        if (path && (typeof path === 'string' || Array.isArray(path))) {
            this.register(path, [], ...middleware);
        } else {
            this.register('/', [], ...middleware);
        }
    }

    get(path: string | string[], ...middleware: any) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/'
        }
        this.register(path, ['GET'], ...middleware);
    }

    post(path: string | string[], ...middleware: any) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/'
        }
        this.register(path, ['POST'], ...middleware);
    }

    put(path: string | string[], ...middleware: any) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/'
        }
        this.register(path, ['PUT'], ...middleware);
    }

    delete(path: string | string[], ...middleware: any) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/'
        }
        this.register(path, ['DELETE'], ...middleware);
    }

    routes(){
        let router = this;
        return (ctx: AppModule.Context, next: AppModule.middleware) => {
            console.log('nextnext', next);
            let method = ctx.req.method;
            let path = ctx.req.path;
            let matchedMiddlewares:AppModule.middleware[] = [];
            router.stack.forEach(route => {
                if (route.match(path, method)) {
                    matchedMiddlewares = matchedMiddlewares.concat(route.middlewares);
                }
            });
            compose(matchedMiddlewares)(ctx, next);
        }
    }
}
