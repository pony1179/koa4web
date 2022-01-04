import {AppModule} from '../interface/App'
export default function compose(middlewares: AppModule.middleware[]) {
    
    for (let i = 0; i < middlewares.length; i++) {
        if (typeof middlewares[i] !== 'function') {
            throw new TypeError('Middleware must be composed of functions')
        }
    }

    return function (ctx: AppModule.Context) {
        let index = -1;
        function dispatch(i = 0):Promise<any> {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn = middlewares[i];
            if (i === middlewares.length) return Promise.resolve();
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i+1)));
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return dispatch(0);
    }
}

// let ctx = {}
// async function A(ctx: Object, next: Function) {
//     console.log('start A')
//     await next();
//     console.log('end A')
// }

// async function B(ctx: Object, next: Function) {
//     console.log('start B')
//     await next();
//     console.log('end B')
// }


// async function C(ctx: Object, next: Function) {
//     console.log('start C')
//     await next();
//     console.log('end C')
// }

// let middlewares = [A, B, C]

// compose(middlewares)(ctx);



