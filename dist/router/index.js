var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        function dispatch(ctx, next) {
            return __awaiter(this, void 0, void 0, function* () {
                let method = ctx.req.method;
                let path = ctx.req.path;
                let matchedMiddlewares = [];
                router.stack.forEach(route => {
                    if (route.match(path, method)) {
                        matchedMiddlewares = matchedMiddlewares.concat(route.middlewares);
                    }
                });
                compose(matchedMiddlewares)(ctx, next);
            });
        }
        return dispatch;
    }
}
