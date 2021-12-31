import { EventEmiiterSpace } from '../interface/EventEmitter';
declare class EventEmiiter implements EventEmiiterSpace.EventEmiiterInterface {
    map: Map<string, EventEmiiterSpace.Handler[]>;
    on(eventName: EventEmiiterSpace.EventName, cb: Function): void;
    once(eventName: EventEmiiterSpace.EventName, cb: Function): void;
    emit(eventName: EventEmiiterSpace.EventName, ...args: any): void;
    off(eventName: EventEmiiterSpace.EventName, cb: Function): void;
}
declare let eventEmitter: EventEmiiter;
export default eventEmitter;
//# sourceMappingURL=event-emitter.d.ts.map