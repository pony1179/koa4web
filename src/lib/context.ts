import { AppModule } from '../interface/App';
import { Request, Response } from 'request4browser';
export default class Context implements AppModule.Context {
    req: Request;
    res: Response = {
        code: 200
    }
    constructor (req:Request, res?: Response) {
        this.req = req;
        if (res) {
            this.res = res;
        }
    }
}