

module.exports = class Eventz {
    
    constructor() {
        this.registeredEvents = {};
    }

    register(eventName, handler) {
        if (typeof(eventName) !== 'string' || typeof(handler) !== 'function') {
            throw TypeError;
        }
        if (!this.registeredEvents[eventName]) {
            this.registeredEvents[eventName] = [];
        }
        this.registeredEvents[eventName].push(handler);
        return this;
    }

    // emit event passing in optional argumments to be called with handelers
    emit(eventName, ...args) {
        if (!this.registeredEvents[eventName]) {
            return false;
        }
        // iterate over handelers and call with arguments
        this.registeredEvents[eventName].forEach(handler => {
            // passing 'null' so as not to change context, could pass 'this' -not sure which is correct here
            handler.call(null, ...args);
        });
        return this;
    }

    // remove a handeler from a named event
    remove(eventName, handler) {
        if (!this.registeredEvents[eventName]) {
            return false;
        }
        if (this.registeredEvents[eventName].length === 1) {
            delete this.registeredEvents[eventName];
            return this;
        }
        this.registeredEvents[eventName] = this.registeredEvents[eventName].filter(func => func !== handler);
        return this;
    }

    // remove all handelers asociated with a given named event
    removeAll(eventName) {
        if (!this.registeredEvents[eventName]) {
            return false;
        }
        delete this.registeredEvents[eventName];
        return this;
    }

    // register one-time event handeler, remove on emit
    once(eventName, handler) {
        // remove event from registered events and call handler, keep context with arrow function
        const callback = () => {
            this.remove(eventName, callback);
            handler();
            return this;
        }
        // callback will get triggered on emit and in turn handler invoked
        this.register(eventName, callback);
    }
}
