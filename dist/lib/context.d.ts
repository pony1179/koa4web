import { AppModule } from '../typings/App';
export default class Context implements AppModule.Context {
    req: AppModule.RequestImpl;
    res: AppModule.ResponseImpl;
    _body?: any;
    constructor(req: AppModule.RequestImpl, res?: AppModule.ResponseImpl);
    get body(): any;
    set body(value: any);
}
//# sourceMappingURL=context.d.ts.map