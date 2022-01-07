export declare namespace AppModule {
    interface App {
        middlewares: middleware[];
        use(handle: middleware): void;
    }
    type middleware = (ctx: Context, next: Function) => void;
    interface Context {
        req: RequestImpl;
        res: ResponseImpl;
        body?: any;
    }
    /**
     * 请求体选项
     */
    interface RequestOption {
        method: SupportedMethod;
        path: string;
        body?: any;
    }
    /**
     * 请求对象
     */
    interface RequestImpl extends RequestOption {
        requestId: string;
    }
    /**
     * 响应对象
     */
    interface ResponseImpl {
        statusCode: statusCode;
        err?: Error;
        body?: any;
    }
    type SupportedMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
    /**
     * 状态码：
     * 200： 请求成功
     * 401： 无权限访问
     * 404： 找不到接口
     */
    type statusCode = 200 | 401 | 404;
    type RequestCallback = (err: Error | null, data: any) => void;
}
//# sourceMappingURL=App.d.ts.map