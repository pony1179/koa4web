import { AppModule } from '../interface/App';
import { RequestImpl, ResponseImpl } from 'request4browser';
export default class Context implements AppModule.Context {
    req: RequestImpl;
    res: ResponseImpl;
    constructor(req: RequestImpl, res?: ResponseImpl);
}
//# sourceMappingURL=context.d.ts.map