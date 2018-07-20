const Eventz = require('./main');

const ev = new Eventz;

// handlers:
const myFunc = () => { console.log('this is a handler function')}
const functionX = () => console.log('handeling this event');

describe('tests for Eventz class', () => {

    test('rgister method should throw a type error if the first argument is not a string', () => {
        expect(() => {
            ev.register(null, myFunc).toThrowError;
        });

        expect(() => {
            ev.register([], myFunc).toThrowError;
        });

        expect(() => {
            ev.register({}, myFunc).toThrowError;
        });
            
    });

    test('rgister method should throw a type error if the second argument is not a reference to a function', () => {
        expect(() => {
            ev.register('myEvent', null).toThrowError;
        });

        expect(() => {
            ev.register('myEvent', []).toThrowError;
        });
        
        expect(() => {
            ev.register('myEvent', {}).toThrowError;
        });
            
    });

    test('registers an event into the registeredEvents object', () => {
        ev.register('click', myFunc);
        expect(ev.registeredEvents['click'].length).toBe(1);
    });
    
    test('registering a second handler to a previously registered event', () => {
        ev.register('click', functionX);
        expect(ev.registeredEvents['click'].length).toBe(2);
    });
    
    test('emit should return false if a named event isnt previously registered', () => {
        const result = ev.emit('unknownEvent');
        expect(result).toBeFalsy();
    });
    
    test('expect emit to call handlers', () => {
        ev.emit('click');
        // since myFunc and function are registered with 'click' event
        expect(myFunc).toHaveBeenCalledWith;
        expect(functionX).toHaveBeenCalled;
    })

    test('remove method should remove a previously registered handler', () => {
        ev.remove('click', myFunc); 
        expect(ev.registeredEvents['click'].length).toBe(1);
    })

    test('remove all handlers registered to a given event', () => {
        // lets re-register myFunc with 'click' event so we have 2 registered handlers there
        ev.register('click', myFunc);
        expect(ev.registeredEvents['click'].length).toBe(2);
        // now remove all
        ev.removeAll('click');
        expect(ev.registeredEvents['click']).toBeUndefined;
    })

    test('one time event should register event, then on emit should call handler and then unregister', () => {
        const customHandler = () => console.log('this is a custom event');
        ev.once('pageLoad', customHandler);
        expect(ev.registeredEvents['pageLoad'].length).toBe(1);
        // now emit and check that handler was called and unregistered
        ev.emit('pageLoad');
        expect(customHandler).toHaveBeenCalled;
        expect(ev.registeredEvents['pageLoad']).toBeUndefined;
    })
});