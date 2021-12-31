import { App } from './interface/App';
export default class Application implements App.AppInterface {
    middlewares: App.middleware[];
    constructor();
    use(handle: App.middleware): void;
    callback(ctx: Object): void;
    listen(): void;
}
//# sourceMappingURL=index.d.ts.map