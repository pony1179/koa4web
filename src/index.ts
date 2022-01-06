import eventEmitter from 'event-emitter4browser';
import { RequestImpl } from 'request4browser';
import  { AppModule } from  './interface/App'
import compose from './lib/compose'
import Context from './lib/context'

export { Router } from './router';

export default class Application implements AppModule.App {
    middlewares: AppModule.middleware[] = [];
    constructor() {
    }

    // use(handle: Function):void;
    // use(path: string, handle: Function):void;
    // use(path: string | Function, handle?: Function): void{
    //     if (arguments.length === 1) {
    //         this.middleware.push(arguments[0]);
    //     } else {
    //         this.middleware.push({
    //             path: arguments[0],
    //             handle: arguments[1]
    //         });
    //     }
    // }
    

    use(handle: AppModule.middleware | AppModule.middleware[]) {
        if (Array.isArray(handle)) {
            handle.forEach(ele => {
                this.use.bind(this, ele);
            })
        } else {
            this.middlewares.push(handle);
        }
    }

    callback = async (ctx: AppModule.Context) => {
        console.log('首次调用compose')
        let fn = compose(this.middlewares);
        console.log('完成了middleware组装')
        fn(ctx).then(()=>{
            console.log('啥时候出发呢')
            eventEmitter.emit(`response-${ctx.req.requestId}`, ctx.res)
        });
    }

    /**
     * 处理请求 
     * @param req 
     */
    handleRequest(req: RequestImpl) {
        let ctx = new Context(req);
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