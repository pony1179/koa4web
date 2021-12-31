export declare namespace App {
    interface AppInterface {
        middlewares: middleware[];
        use(handle: middleware): void;
    }
    type middleware = (ctx: Object, next: Function) => void;
}
//# sourceMappingURL=App.d.ts.map