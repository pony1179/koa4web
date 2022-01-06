import { Layer } from './layer';
import compose from '../lib/compose';
export class Router {
    constructor(opts = { prefix: "/" }) {
        this.stack = [];
        // 该路由允许的方法
        this.allowedMethods = [];
        this.params = {};
        this.opts = opts;
    }
    register(path, methods, ...middleware) {
        let router = this;
        if (Array.isArray(path)) {
            for (let i = 0; i < path.length; i++) {
                this.register.call(this, path[i], methods, middleware);
            }
        }
        let middlewares = middleware;
        let route = new Layer(path, methods, middlewares);
        router.stack.push(route);
    }
    use(path, ...middleware) {
        if (path && (typeof path === 'string' || Array.isArray(path))) {
            this.register(path, [], ...middleware);
        }
        else {
            this.register('/', [], ...middleware);
        }
    }
    get(path, ...middleware) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/';
        }
        this.register(path, ['GET'], ...middleware);
    }
    post(path, ...middleware) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/';
        }
        this.register(path, ['POST'], ...middleware);
    }
    put(path, ...middleware) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/';
        }
        this.register(path, ['PUT'], ...middleware);
    }
    delete(path, ...middleware) {
        if (typeof path !== 'string') {
            throw new Error('the path must be string');
        }
        if (path.length === 0) {
            path = '/';
        }
        this.register(path, ['DELETE'], ...middleware);
    }
    routes() {
        let router = this;
        return (ctx, next) => {
            console.log('nextnext', next);
            let method = ctx.req.method;
            let path = ctx.req.path;
            let matchedMiddlewares = [];
            router.stack.forEach(route => {
                if (route.match(path, method)) {
                    matchedMiddlewares = matchedMiddlewares.concat(route.middlewares);
                }
            });
            compose(matchedMiddlewares)(ctx, next);
        };
    }
}
