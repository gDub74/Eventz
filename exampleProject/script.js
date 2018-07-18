// import the Eventz module from main.js
import { Eventz } from '../main.js'


// create an instance of Eventz class
const eventz = new Eventz;


// example of using the register() method 
eventz.register('#main', 'click', function () {
    this.classList.toggle('mainStyle');
    this.innerHTML = this.innerHTML === 'Looking Good!' ? 'Click Away! ' : 'Looking Good!' 
    console.log('nice job using the register event method');
    });


// registering a button click that will unregister a click event on #main div in its callback.
eventz.register('#removeOneClick', 'click', function () {
    eventz.remove('#main', 'click', function () {
    this.classList.toggle('mainStyle');
    this.innerHTML = this.innerHTML === 'Looking Good!' ? 'Click Away! ' : 'Looking Good!' 
    console.log('nice job using the register event method');
    });
});
    

//example of registerAll() registering all 'li' elements on a 'mouseover' event.
eventz.registerAll('li', 'mouseover', function () {
    this.classList.toggle('listStyle');
    });


// example of registering a button click and then calling the registerAll() method its callback.
eventz.register('#addMouseout', 'click', function () {
    eventz.registerAll('li', 'mouseout', function () {
        this.classList.toggle('listStyle');
        console.log('mouseout event');
    });
});
    
// and here another button to impliment removeAll() those 'mouseout' events 
eventz.register('#removeMouseout', 'click', function () {
    eventz.removeAll('li', 'mouseout', function () {
        this.classList.toggle('listStyle');
        console.log('registered events: ', eventz.registeredEvents);
    });
});


// register a button with a one time only event 
eventz.once('#onlyOnce', 'click', function () {
    document.body.setAttribute('style', 'background-color: lightgreen');
    document.getElementById('addText').innerHTML = 'This event can only happen once - try clicking again and nothing will happen.'
});





// let's grab some info from an input text field to add to an object to be passeed to a custom event emitter as it's detail argument.
// eventz.register('#textInput', 'change', function () {
//     const data = {}
//     const text = document.getElementById('textInput').value
//     data.name = text;
//     data.createdAt = Date.now()
    
//     // here we can call the emitCustom() method that will dispatch a custome event and add a listiner for that custom event 
//     // and we can pass it our data object with any optional material we'd like to be emitted upon the event firing.
//     // the handeler argument is a function to be passed as the callback to the event
//     eventz.emitCustom('#greeting', '#textInput', 'greetingEvent', handeler, data);

   
//     // function to handel our event
//     function handeler(e) {
//         consol.log('in handeler callback', e.detail);
//         document.getElementById('hello').innerHTML = `Welcome to the party ${e.detail.name}`
//     }
// });


