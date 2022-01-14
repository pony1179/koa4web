import eventEmitter from 'event-emitter4browser';
import  { AppModule } from  './typings/App'
import compose from './lib/compose'
import Context from './lib/context'

export { Router } from './router';

export default class Application implements AppModule.App {
    middlewares: AppModule.Middleware[] = [];
    layers: AppModule.Layer[] = [];
    constructor() {
    }

    use(path: string | AppModule.Middleware | AppModule.Middleware[], ...middlewares: any): void {
        if (typeof path === 'string') {
            if (path) {
                if (middlewares.length > 0) {
                    this.layers.push({
                        path,
                        middlewares
                    })
                }
            } else {
                this.layers.push({
                    path: '/',
                    middlewares
                })
            }
        } else {
            if (Array.isArray(path)) {
                path.forEach(ele => {
                    this.use.bind(this, ele);
                })
            } else {
                middlewares.unshift(path);
                this.layers.push({
                    path: '/',
                    middlewares: middlewares
                });
            }
        }
    }

    callback = async (ctx: AppModule.Context) => {
        let fn = compose(this.middlewares);
        // debugger;
        fn(ctx).then(()=>{
            // debugger;
            eventEmitter.emit(`response-${ctx.req.requestId}`, ctx.res)
        });
    }

    match(layer: AppModule.Layer, path: string) {
        let pathSplitArr = path.split('/');
        pathSplitArr.forEach((ele, index) => {
            if (ele === '') {
                pathSplitArr.splice(index,1)
            }
        })
        let layerPathSplitArr = layer.path.split('/');
        layerPathSplitArr.forEach((ele, index) => {
            if (ele === '') {
                layerPathSplitArr.splice(index,1)
            }
        })

        for (let i = 0; i < layerPathSplitArr.length; i++) {
            if (layerPathSplitArr[i] !== pathSplitArr[i] && layerPathSplitArr[i].indexOf(':') !== 0) {
                return false
            }
        }
        return true;
    }

    /**
     * 处理请求 
     * @param req 
     */
    handleRequest(req: AppModule.RequestImpl) {
        let ctx = new Context(req);
        let path = ctx.req.path;
        ctx.path = path;
        ctx.method = ctx.req.method;
        this.middlewares = [];
        this.layers.forEach(layer => {
            if (this.match(layer,path)) {
                this.middlewares = this.middlewares.concat(layer.middlewares);
            }
        });
        this.callback(ctx);
    }

    /**
     * 启动监听
     */
    listen() {
        eventEmitter.on('request', this.handleRequest.bind(this));
        console.log('koa4browser已启动，开始监听请求')
    }
}