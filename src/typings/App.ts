export namespace AppModule {
    export interface App {
        middlewares: Middleware[],     
        use(path: string | Middleware | Middleware[], ...handle: any):void
    }
    // export type Data = {
    //     path:string;
    //     handle: Function;
    // } | {
    //     handle: Function
    // }

    export type Middleware = (ctx: Context, next: Function) => void

    // 中间件层
    export type Layer = {
        path: string,
        middlewares: Middleware[]
    }

    export interface Context {
        req: RequestImpl,
        res: ResponseImpl,
        body?: any
    }

    /**
     * 请求体选项
     */
    export interface RequestOption {
        method: SupportedMethod,
        path: string,
        body?: any,
    }

    /**
     * 请求对象
     */
    export interface RequestImpl extends RequestOption {
        requestId: string,
    }

    /**
     * 响应对象
     */
    export interface ResponseImpl {
        statusCode: statusCode,
        err?: Error,
        body?: any
    }

    export type SupportedMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
    
    /**
     * 状态码：
     * 200： 请求成功
     * 401： 无权限访问
     * 404： 找不到接口
     */
    export type statusCode = 200 | 401 | 404

    export type RequestCallback = (err: Error | null, data: any) => void

}



 