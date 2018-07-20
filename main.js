

class Eventz {
    constructor() {
        this.registeredEvents = {};
    }

    register(name, handler) {
        if (typeof (name) != 'string' || typeof(handler) != 'function') {
            throw new TypeError;
        }
        if (!this.registeredEvents[name]) {
            this.registeredEvents[name] = [];
        }
        this.registeredEvents[name].push(handler);
    }

    // emit event passing in aptional argumments to be called with handelers
    emit(name, ...args) {
        if (typeof (name) != 'string') {
            throw new TypeError;
        }
        if (!this.registeredEvents[name]) {
            throw new Error('event not registered');
        }
        // iterate over handelers and call with arguments
        this.registeredEvents[name].forEach(handler => {
            handler.call(this, ...args);
        });
    }

    // remove a handeler from a named event
    remove(name, handler) {
        if (!this.registeredEvents[name]) {
            throw new Error('event not registered');
        }
        if (this.registeredEvents[name].length === 1) {
            delete this.registeredEvents[name];
            return;
        }
        this.registeredEvents[name] = this.registeredEvents[name].filter(element => element != handler)
    }

    // remove all handelers asociated with a given named event
    removeAll(name) {
        if (typeof (name) != 'string') {
            throw new TypeError;
        }
        if (!this.registeredEvents[name]) {
            throw new Error('event not registered');
        }
        delete this.registeredEvents[name];
    }


    // register onetime event handeler, remove on emit
    once(name, handler) {
        if (typeof(name) != 'string' || typeof(handler) != 'function') {
            throw new TypeError;
        }
        // callback will get triggered on emit
        this.register(name, callback);

        // remove event from registered events and call handler
        function callback() {
            handler();
            this.remove(name, callback);
        }
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
ev.emit('pageLoad', 'John', 'Doe')


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