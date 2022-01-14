import { AppModule } from '../typings/App';
export default class Context implements AppModule.Context {
    req: AppModule.RequestImpl;
    res: AppModule.ResponseImpl = {
        statusCode: 200,
        body: null
    };
    _path: string = '/';
    _method: string = 'GET';
    _body?:any;
    // body?:any;
    constructor (req:AppModule.RequestImpl, res?: AppModule.ResponseImpl) {
        this.req = req;
        if (res) {
            this.res = res;
        }
        this._body = this.res.body;
    }
    get body() {
        return this._body;
    }
    set body(value:any) {
        this._body = value;
        this.res.body = this._body;
    }
    get path() {
        return this._path;
    }
    set path(value: string) {
        this._path = value;
    }
    get method() {
        return this._method;
    }
    set method(value: string) {
        this._method = value;
    }
}