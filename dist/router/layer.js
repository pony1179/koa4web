export class Layer {
    constructor(path, methods, middleware) {
        this.methods = methods;
        this.path = path;
        this.middlewares = Array.isArray(middleware) ? middleware : [middleware];
    }
    match(path, method) {
        // if (path === this.path && method === this.method) {
        //     return true;
        // }
        return false;
    }
}
