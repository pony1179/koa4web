import { AppModule } from './interface/App';
export default class Application implements AppModule.App {
    middlewares: AppModule.middleware[];
    constructor();
    use(handle: AppModule.middleware): void;
    callback(ctx: AppModule.Context): void;
    listen(): void;
}
//# sourceMappingURL=index.d.ts.map