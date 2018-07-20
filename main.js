

class Eventz {
    constructor() {
        this.registeredEvents = {};
    }

    register(eventName, handler) {
        if (typeof(eventName) !== 'string' || typeof(handler) !== 'function') {
            throw new TypeError;
        }
        if (!this.registeredEvents[eventName]) {
            this.registeredEvents[eventName] = [];
        }
        this.registeredEvents[eventName].push(handler);
    }

    // emit event passiing in optional argumments to be called with handelers
    emit(eventName, ...args) {
        if (!this.registeredEvents[eventName]) {
            return false;
        }
        // iterate over handelers and call with arguments
        this.registeredEvents[eventName].forEach(handler => {
            handler.call(null, ...args);
        });
        // if the emit is successfull 
        return true;
    }

    // remove a handeler from a named event
    remove(eventName, handler) {
        if (!this.registeredEvents[eventName]) {
            return false;
        }
        if (this.registeredEvents[eventName].length === 1) {
            delete this.registeredEvents[eventName];
            return;
        }
        this.registeredEvents[eventName] = this.registeredEvents[eventName].filter(func => func !== handler)
    }

    // remove all handelers asociated with a given named event
    removeAll(eventName) {
        if (!this.registeredEvents[eventName]) {
            return false;
        }
        delete this.registeredEvents[eventName];
    }


    // register one-time event handeler, remove on emit
    once(eventName, handler) {
        // remove event from registered events and call handler, keep context with arrow function
        const callback = () => {
            this.remove(eventName, callback);
            handler();
            return true;
        }
        // callback will get triggered on emit and in turn handler invoked
        this.register(eventName, callback);
    }
}


let ev = new Eventz;

// handlers:
let functonX = () => console.log('my first event');
let greet = (firstName, lastName) => console.log(`Hello ${firstName} ${lastName}, how are you today?`);
let custom = () => console.log('this is a custom event');
let sum = (x, y) => console.log(x + y);



// registrations: 
ev.register('click', functonX);
ev.register('customEvent', custom);
ev.register('submit', sum);
ev.register('pageLoad', greet);


// emits
ev.emit('click', 'hello', 'world', 'we can', 'have zas', 'many', 'arguments as', 'we wish');
ev.emit('customEvent');
ev.emit('submit', 4, 5);
ev.emit('pageLoad', 'John', 'Doe');
// ev.emit('fakeName');


// register one time event:
ev.once('hover', () => console.log('hovering one time'));

// emit one time event
ev.emit('hover');



console.log('********************');
console.log(ev.registeredEvents);
ev.remove('click', functonX);
console.log('********************');
console.log(ev.registeredEvents); 
console.log('********************');
ev.removeAll('submit');
console.log(ev.registeredEvents);