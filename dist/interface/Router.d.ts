export declare namespace RouterModule {
    interface Layer {
        methods: method[];
        path: path;
        match: match;
        middlewares: middleware[];
        pathSplitArr: string[];
    }
    interface RouterInterface {
        opts: opts;
        params: params;
        stack: Layer[];
        allowedMethods: method[];
        register: register;
        use: use;
    }
    interface opts {
        prefix: string;
    }
    interface params {
    }
    type register = (path: string | string[], methods: method[], middleware: middleware | middleware[], opts: opts) => void;
    type get = (path: string | string[], middleware: middleware, opts?: opts) => void;
    type post = (path: string | string[], middleware: middleware, opts?: opts) => void;
    type put = (path: string | string[], middleware: middleware, opts?: opts) => void;
    type use = (path: string | string[] | middleware, ...middleware: any) => void;
    type method = 'GET' | 'POST' | 'DELETE' | 'PUT';
    type middleware = (ctx: Object, next: Function) => void;
    type path = string;
    type match = (path: string, method: method) => boolean;
}
//# sourceMappingURL=Router.d.ts.map