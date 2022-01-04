import eventEmitter from 'event-emitter4browser';
import { Request } from 'request4browser';
import  { AppModule } from  './interface/App'
import compose from './lib/compose'
import Context from './lib/context'

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
    

    use(handle: AppModule.middleware) {
        this.middlewares.push(handle);
    }

    callback(ctx: AppModule.Context) {
        compose(this.middlewares)(ctx);
    }

    /**
     * 处理请求 
     * @param req 
     */
    handleRequest(req: Request) {
        let ctx = new Context(req);
        this.callback.call(this, ctx);
    }

    /**
     * 启动监听
     */
    listen() {
        eventEmitter.on('request', this.handleRequest.bind(this));
        console.log('koa4browser已启动，开始监听请求')
    }
}