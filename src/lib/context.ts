import { AppModule } from '../interface/App';
import { RequestImpl, ResponseImpl } from 'request4browser';
export default class Context implements AppModule.Context {
    req: RequestImpl;
    res: ResponseImpl = {
        code: 200
    }
    constructor (req:RequestImpl, res?: ResponseImpl) {
        this.req = req;
        if (res) {
            this.res = res;
        }
    }
}