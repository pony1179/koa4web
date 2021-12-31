import eventEmitter from './event-emitter';
const request = function () {
    eventEmitter.emit('request', {});
};
export default request;
