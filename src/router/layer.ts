import { RouterModule } from '../typings/Router'
export class Layer implements RouterModule.Layer{
    methods: RouterModule.method[];
    path: RouterModule.path;
    pathSplitArr: string[];
    middlewares: RouterModule.middleware[];
    constructor(path: string, methods: RouterModule.method[], middleware: RouterModule.middleware | RouterModule.middleware[]) {
        this.methods = methods;
        this.path = path;
        this.middlewares = Array.isArray(middleware) ? middleware : [middleware];
        this.pathSplitArr = path.split('/');
        this.pathSplitArr.forEach((ele, index) => {
            if (ele === '') {
                this.pathSplitArr.splice(index,1)
            }
        })
    }
    
    match(path: string, method: RouterModule.method) {
        if (this.methods.indexOf(method) === -1) {
            return false;
        }
        let pathSplitArr = path.split('/');
        pathSplitArr.forEach((ele, index) => {
            if (ele === '') {
                pathSplitArr.splice(index,1)
            }
        })
        if (this.pathSplitArr.length !== pathSplitArr.length) {
            return false;
        }
        for (let i = 0; i < this.pathSplitArr.length; i++) {
            if (this.pathSplitArr[i] !== pathSplitArr[i] && this.pathSplitArr[i].indexOf(':') !== 0) {
                return false
            }
        }
        return true;
    }
}