import {RouterModule} from './Router';
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

    export type middleware = (ctx: Object, next: Function) => void

    export interface Context {
        method: RouterModule.method,
        path: string,
        payload?: any,
        query: any,
        params: any
    }
}



 