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


// registering a button click that will unregister a click event on #main div in its callBack
eventz.register('#removeOneClick', 'click', function () {
    eventz.remove('#main', 'click', function () {
    this.classList.toggle('mainStyle');
    this.innerHTML = this.innerHTML === 'Looking Good!' ? 'Click Away! ' : 'Looking Good!' 
    console.log('nice job using the register event method');
    });
});
    

//example of registerAll() registering all 'li' elements on a 'mouseover' event
eventz.registerAll('li', 'mouseover', function () {
    this.classList.toggle('listStyle');
    });


// here is an examole of registering a button click and then we are calling the registerAll() method in the outer callback
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
    // const child = document.getElementById("oneTime");
    // child.parentNode.removeChild(child);
    document.getElementById('addText').innerHTML = 'This event can only happen once - try clicking again and nothing will happen.'
});





// let's grab some info from an input text field to add to a detail object to be passe to a custom event emitter
const textDetail = {}
eventz.register('#textInput', 'change', function () {
    const text = document.getElementById('textInput').value
    textDetail.name = text;
    console.log(textDetail);
})

// and now we can create our custom event the first arg 
eventz.emitCustom('')


