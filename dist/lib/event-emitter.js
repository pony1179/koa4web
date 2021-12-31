class EventEmiiter {
    constructor() {
        this.map = new Map();
    }
    on(eventName, cb) {
        if (this.map.has(eventName)) {
            let handlers = this.map.get(eventName);
            handlers.push({ once: false, cb });
            this.map.set(eventName, handlers);
        }
        else {
            this.map.set(eventName, [{ once: false, cb }]);
        }
    }
    once(eventName, cb) {
        if (this.map.has(eventName)) {
            let handlers = this.map.get(eventName);
            handlers.push({ once: false, cb });
            this.map.set(eventName, handlers);
        }
        else {
            this.map.set(eventName, [{ once: true, cb }]);
        }
    }
    emit(eventName, ...args) {
        // args = Array.prototype.slice.apply(arguments, [1]);
        if (this.map.has(eventName)) {
            let handlers = this.map.get(eventName);
            handlers === null || handlers === void 0 ? void 0 : handlers.forEach(ele => {
                ele.cb.call(null, ...args);
                if (ele.once) {
                    this.off(eventName, ele.cb);
                }
            });
        }
    }
    off(eventName, cb) {
        if (this.map.has(eventName)) {
            let handlers = this.map.get(eventName);
            handlers === null || handlers === void 0 ? void 0 : handlers.forEach((ele, index) => {
                if (ele.cb === cb) {
                    handlers === null || handlers === void 0 ? void 0 : handlers.splice(index, 1);
                }
            });
            if ((handlers === null || handlers === void 0 ? void 0 : handlers.length) === 0) {
                this.map.delete(eventName);
            }
            else {
                this.map.set(eventName, handlers);
            }
        }
    }
}
let eventEmitter = new EventEmiiter();
export default eventEmitter;
