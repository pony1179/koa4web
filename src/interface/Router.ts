export namespace RouterModule {
    export interface Layer {
        methods: method[],
        path: path,
        match: match,
        middlewares: middleware[],
        pathSplitArr: string[]
    }
    export interface RouterInterface {
        opts: opts,
        params: params,
        stack: Layer[],
        allowedMethods: method[],
        register: register,
        use: use,
        // routes:
        // get: get,
        // post: post,
        // put: put,
        // delete: delete
    }

    export interface opts {
        prefix: string
    }

    export interface params {}

    export type register = (path: string | string[], methods: method[], middleware: middleware | middleware[], opts: opts) => void

    export type get = (path: string | string[], middleware: middleware, opts?: opts) => void

    export type post = (path: string | string[], middleware: middleware, opts?: opts) => void

    export type put = (path: string | string[], middleware: middleware, opts?: opts) => void

    // export type delete = (path: string | string[], middleware: middleware, opts?: opts) => void

    export type use = (path: string | string[] | middleware, ...middleware: any) => void;


    export type method = 'GET' | 'POST' | 'DELETE' | 'PUT'

    export type middleware = (ctx: Object, next: Function) => void

    export type path = string

    export type match = (path: string, method: method) => boolean

}