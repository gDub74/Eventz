const Eventz = require('./browserMain');

const ev = new Eventz;


describe('tests for Eventz class', () => {

    test('registers an event into the registeredEvents object', () => {
        document.body.innerHTML = '<div id="main">' + '</div>';
        ev.register('#main', 'click', function () { console.log('hello test') })
        expect(ev.registeredEvents.length).toBe(1)
    });
    
    test('removes a previously registered event from the registeredEvents object ', () => {
        ev.remove('#main', 'click', function () { console.log('hello test') });
        document.body.innerHTML = '<div id="main">' + '</div>';
        expect(ev.registeredEvents.length).toBe(0);
    });

    test('registers multiple elements with the registerAll method', () => {
        document.body.innerHTML =
            '<div>' +
            '<p>' + '</p>'
            '<p>' + '</p>'
            '<p>' + '</p>'
            '</div>';
        ev.registerAll('p', 'mouseover', function () { console.log('hovering over a p tag') });
        expect(ev.registeredEvents.length).toBe(1);
    });

    test('removes multiple elements with the removeAll method', () => {
        document.body.innerHTML
        '<div>' +
        '<p>' + '</p>'
        '<p>' + '</p>'
        '<p>' + '</p>'
        '</div>';
        ev.removeAll('p', 'mouseover', function () { console.log('hovering over a p tag') });
        expect(ev.registeredEvents.length).toBe(0);
    });
    
    test('register method should throw on invalid input, first argument must be a string', () => {
        let main = ['this a string inside an array, not a string'];
        expect(() => {
            ev.register(main, 'click', function () { });
        }).toThrow();
    });

    test('register method should throw on invalid input, second argument must be a string', () => {
        let click = ['this is an array, not an event name'];
        expect(() => {
            ev.register('#main', click, function () { });
        }).toThrow();
    });

    test('register method should throw on invalid input, third argument must be a function', () => {
        let notFunc = 'this is not a function';
        expect(() => {
            ev.register('#main', 'click', notFunc);
        }).toThrow();
    });

});