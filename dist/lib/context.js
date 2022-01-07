export default class Context {
    // body?:any;
    constructor(req, res) {
        this.res = {
            statusCode: 200,
            body: null
        };
        this.req = req;
        if (res) {
            this.res = res;
        }
        this._body = this.res.body;
    }
    get body() {
        return this._body;
    }
    set body(value) {
        this._body = value;
        this.res.body = this._body;
    }
}
