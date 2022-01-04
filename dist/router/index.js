import { Layer } from './layer';
const methodConfig = ['GET', 'POST', 'PUT', 'DELETE'];
export class Router {
    // get: RouterModule.get;
    constructor(opts = { prefix: "/" }) {
        this.stack = [];
        // 该路由允许的方法
        this.allowedMethods = [];
        this.params = {};
        this.opts = opts;
        // methodConfig.forEach(ele => {
        //     this[ele.toLocaleLowerCase()] = (path: string | string[], middleware: RouterModule.middleware) => {
        //         this.register(path, ele, middleware);
        //     }
        // })
    }
    register(path, methods, middleware) {
        let router = this;
        if (Array.isArray(path)) {
            for (let i = 0; i < path.length; i++) {
                this.register.call(this, path[i], methods, middleware);
            }
        }
        let middlewares = Array.prototype.slice.call(arguments, 2);
        // 管理本路由允许的method
        // if (methods.length === && this.allowedMethods.indexOf(method) === -1) {
        //     this.allowedMethods.push(method.toUpperCase() as RouterModule.method);
        // }
        let route = new Layer(path, methods, middlewares);
        router.stack.push(route);
    }
    use(path, ...middleware) {
        if (typeof path === 'string' || Array.isArray(path)) {
            // let middlewares = Array.prototype.slice.call(arguments, 1);
            this.register(path, [], middleware);
        }
        else {
            // let middlewares = Array.prototype.slice.call(arguments);
            this.register('/', [], middleware);
        }
    }
    routes() {
        function dispatch() {
        }
    }
}
