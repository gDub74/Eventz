const Eventz = require('./main');

const ev = new Eventz;


describe('tests for Eventz class', () => {

    test('registers an event into the registered events object', () => {
        document.body.innerHTML = '<div id="main">' + '</div>';
        ev.register('#main', 'click', function () { console.log('hello test') })
        expect(ev.registeredEvents.length).toBe(1)
    });
    
    test('registers multiple elements with the registerAll method', () => {
        document.body.innerHTML =
        '<div>' +
        '<p>' + '</p>'
        '<p>' + '</p>'
        '<p>' + '</p>'          
        '</div>';
        ev.registerAll('p', 'mouseover', function () { console.log('hovering over a p tag') });
        expect(ev.registeredEvents.length).toBe(2);
    });
    
    console.log(ev.registeredEvents);

});





