import { AppModule } from '../typings/App';
export default function compose(middlewares: AppModule.middleware[]): (ctx: AppModule.Context, next?: AppModule.middleware | undefined) => Promise<any>;
//# sourceMappingURL=compose.d.ts.map