import {AppModule} from '../interface/App'
export default function compose(middlewares: AppModule.middleware[]) {
    for (let i = 0; i < middlewares.length; i++) {
        if (typeof middlewares[i] !== 'function') {
            throw new TypeError('Middleware must be composed of functions')
        }
    }
    return function (ctx: AppModule.Context, next?: AppModule.middleware) {
        let index = -1;
        function dispatch(i = 0):Promise<any> {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn:AppModule.middleware | undefined = middlewares[i];
            if (i === middlewares.length) fn = next;
            if(!fn) return Promise.resolve();
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i+1)));
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return dispatch(0);
    }
}
