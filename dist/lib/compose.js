export default function compose(middlewares) {
    for (let i = 0; i < middlewares.length; i++) {
        if (typeof middlewares[i] !== 'function') {
            throw new TypeError('Middleware must be composed of functions');
        }
    }
    return function (ctx, next) {
        // debugger;
        let index = -1;
        function dispatch(i = 0) {
            let currentMiddleware = middlewares[i];
            // debugger;
            if (i <= index)
                return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn = currentMiddleware;
            if (i === middlewares.length) {
                fn = next;
            }
            if (!fn) {
                return Promise.resolve();
            }
            try {
                let nextMid = dispatch.bind(null, i + 1);
                return Promise.resolve(fn(ctx, nextMid));
            }
            catch (error) {
                return Promise.reject(error);
            }
        }
        return dispatch(0);
    };
}
