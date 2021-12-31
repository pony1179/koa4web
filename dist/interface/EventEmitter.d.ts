export declare namespace EventEmiiterSpace {
    interface EventEmiiterInterface {
        map: Map<string, Handler[]>;
        on: (eventName: EventName, cb: Function) => void;
        once: (eventName: EventName, cb: Function) => void;
        emit: (eventName: EventName, ...args: any) => void;
        off: (eventName: EventName, cb: Function) => void;
    }
    interface Handler {
        once: boolean;
        cb: Function;
    }
    type EmitData = Object;
    type EventName = string;
    type EventCallBack = Function;
    type onType = (eventName: string, handler: Handler) => void;
}
//# sourceMappingURL=EventEmitter.d.ts.map