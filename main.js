


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
        this.registeredEvents[name] = this.registeredEvents[name].filter(element => element != handeler)
    }

    // remove all handelers asociated with a given named event
    removeAll(name) {
        if (!name) {
            throw new Error('named event argument must be provided');
        }
        if (!this.registeredEvents[name]) {
            return;
        }
        delete this.registeredEvents[name];
    }

    // register a onetime event handeler that will be removed upon the event emitting
    once(name, handeler) {
        // first we register the event name with a callback that will get triggered upon emission
        this.register(name, callback);

        // now in callback we remove the event from registered events and call the handeler that was first passed
        function callback() {
            handeler();
            this.remove(name, callback);
        }
    }

}




let ev = new Eventz;

let functonX = function () { console.log('my second listiner') }

ev.register('click', functonX);
ev.register('click', function () { console.log('my second listiner', arguments) });
ev.register('customEvent', function () { console.log('this is a custom event') });

ev.emit('click', 'hello', 'world', 'we can have as many', 'arguments as', 'we wish');
ev.emit('customEvent');


// ev.once('hover', () => console.log('hovering one time'));
// console.log(ev.registeredEvents);
// ev.emit('hover');
console.log(ev.registeredEvents);
ev.remove('click', functonX);

console.log(ev.registeredEvents);

