export default class Context {
    constructor(req, res) {
        this.res = {
            code: 200
        };
        this.req = req;
        if (res) {
            this.res = res;
        }
    }
}
