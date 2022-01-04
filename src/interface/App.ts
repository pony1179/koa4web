import { Request, Response } from 'request4browser';
export namespace AppModule {
    export interface App {
        middlewares: middleware[]     
        use(handle: middleware):void   
        // use(path: string, handle: Function):void
    }
    // export type Data = {
    //     path:string;
    //     handle: Function;
    // } | {
    //     handle: Function
    // }

    export type middleware = (ctx: Context, next: Function) => void

    export interface Context {
        req: Request,
        res: Response
    }
}



 