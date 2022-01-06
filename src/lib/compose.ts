import {AppModule} from '../interface/App'
export default function compose(middlewares: AppModule.middleware[]) {
    console.log('compose in middlewares.length', middlewares.length)
    console.log('compose in middlewares', middlewares)
    for (let i = 0; i < middlewares.length; i++) {
        if (typeof middlewares[i] !== 'function') {
            throw new TypeError('Middleware must be composed of functions')
        }
    }
    return function (ctx: AppModule.Context, next?: AppModule.middleware) {
        let index = -1;
        function dispatch(i = 0):Promise<any> {
            console.log('i', i);
            console.log('middlewares[i]', middlewares[i]);
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn:AppModule.middleware | undefined = middlewares[i];
            if (i === middlewares.length) {
                fn = next;
                console.log('next', next)
            } 
            if(!fn) {
                console.log('resolved 掉了')
                return Promise.resolve();
            }
            try {
                let nextMid = dispatch.bind(null, i+1);
                console.log('nextMid', nextMid);
                return Promise.resolve(fn(ctx, nextMid));
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return dispatch(0);
    }
}
