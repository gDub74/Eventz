


// Emitting named events with any number of arguments.
// Registering handler functions for named events that are passed the appropriate arguments on emission.
// Registering a "one-time" handler that will be called at most one time.
// Removing specific previously-registered event handlers and/or all previously-registered event handlers.
// This module should be suitable for publishing to npm, though it is not necessary for you to do so.
// Do not subclass or otherwise require an existing Event Emitter module, and do not include any dependencies apart from testing or development
// dependencies.


class Eventz {
    constructor() {
        // store named events as key and the handeler functions associated in an array eg. {click : [ handler, handler, ...]}
        this.registeredEvents = {};
    }


    //register event name and associated handeler 
    register(name, handler) {
        if (arguments.length != 2) {
            throw new Error('name and handeler must be provided as a string and function respectively')
        }
        if (typeof (name) != 'string' || typeof(handler) != 'function') {
            throw new TypeError;
        }
        if (!this.registeredEvents[name]) {
            // if this named event hasn't been registered previsiouly then we need an array to push the handeler into
            this.registeredEvents[name] = [];
        }
        this.registeredEvents[name].push(handler);
    }


    // emit a registered event and all the handelers associated with it passing in any aptional argumments to be called with the handelers
    emit(name, ...args) {
        if (!this.registeredEvents[name]) {
            return undefined;
        } 
        // iterate over handelers associated with registered named event and use function.prototype.call() method with arguments
        this.registeredEvents[name].forEach(handler => {
            handler.call(this, ...args);
        });
    }

    // remove a handeler from a named event
    remove(name, handeler) {
        if (!this.registeredEvents[name]) {
            return undefined;
        }
        if (this.registeredEvents[name].length === 1) {
            delete this.registeredEvents[name];
            return;
        }
        if (this.registeredEvents[name]) {
            this.registeredEvents[name] = this.registeredEvents.filter(item => item != handeler)
        }
    }

}




let ev = new Eventz;

ev.register('click', function () { console.log('my listiner', arguments) });
ev.register('click', function () { console.log('my second listiner', arguments) });
ev.register('customEvent', function () { console.log('this is a custom event') });

console.log(ev.registeredEvents);
ev.emit('click', 'hello', 'world', 'we can have as many', 'arguments as', 'we wish')
ev.emit('customEvent');