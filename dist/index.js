import compose from './lib/compose';
import eventEmitter from 'event-emitter4browser';
export default class Application {
    constructor() {
        this.middlewares = [];
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
        this.middlewares.push(handle);
    }
    callback(ctx) {
        compose(this.middlewares)(ctx);
    }
    listen() {
        eventEmitter.on('request', this.callback.bind(this));
        console.log('koa4browser已启动，开始监听请求');
    }
}
