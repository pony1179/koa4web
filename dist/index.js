var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import eventEmitter from 'event-emitter4browser';
import compose from './lib/compose';
import Context from './lib/context';
export { Router } from './router';
export default class Application {
    constructor() {
        this.middlewares = [];
        this.callback = (ctx) => __awaiter(this, void 0, void 0, function* () {
            console.log('首次调用compose');
            let fn = compose(this.middlewares);
            console.log('完成了middleware组装');
            fn(ctx).then(() => {
                console.log('啥时候出发呢');
                eventEmitter.emit(`response-${ctx.req.requestId}`, ctx.res);
            });
        });
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
    use(handle) {
        if (Array.isArray(handle)) {
            handle.forEach(ele => {
                this.use.bind(this, ele);
            });
        }
        else {
            this.middlewares.push(handle);
        }
    }
    /**
     * 处理请求
     * @param req
     */
    handleRequest(req) {
        let ctx = new Context(req);
        this.callback(ctx);
    }
    /**
     * 启动监听
     */
    listen() {
        eventEmitter.on('request', this.handleRequest.bind(this));
        console.log('koa4browser已启动，开始监听请求');
    }
}
