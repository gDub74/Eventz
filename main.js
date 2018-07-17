
// Create an Event Emitter module in JavaScript (as modern of a version as you prefer) with documentation and tests. Your implementation should
// allow for:
// Emitting named events with any number of arguments.
// Registering handler functions for named events that are passed the appropriate arguments on emission.
// Registering a "one-time" handler that will be called at most one time.
// Removing specific previously-registered event handlers and/or all previously-registered event handlers.
// This module should be suitable for publishing to npm, though it is not necessary for you to do so.
// Do not subclass or otherwise require an existing Event Emitter module, and do not include any dependencies apart from testing or development
// dependencies.


export class Eventz {

    constructor() {
        this.registeredEvents = [];
    }
    


    // register() is a method to register a named event on one element. 
    // target is a string name of the html tag ID which to arttach the event listiner use '#elementId', or for more detailed query selector info see: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    // eventName is a string that must be of an event type
    // callBack is your custom method that will fire once the event is triggered 
    register(target, eventName, callBack) {
        const el = document.querySelector(target);
        el.addEventListener(eventName, callBack);
        
        //save reference 
        this.registeredEvents.push({
            target: el,
            eventName,
            callBack,
        })
    }

    

    // registerAll is similar to register() except it can register all of a given element or class type at once. 
    // For example if you wanted to add a 'click' listiner to all 'buttons' or a 'mouseover' event to all your 'li' elements on your document.
    // for info on querySelecorAll() see: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll 

    registerAll(targets, eventName, callBack) {
        const els = document.querySelectorAll(targets);
        els.forEach(el => el.addEventListener(eventName, callBack));
        
        this.registeredEvents.push({
            target: els,
            eventName,
            callBack,
        })
    }


    
    // method for removing one registered event
    removeOne() {

    }


    // remove all method for removing all registered listeners given element or class that were placed at the same time. 
    // The targets, eventName, and callBack must match exactly to the arguments used durring the registerAll() method.
    removeAll(targets, eventName, callBack) {
        const els = document.querySelectorAll(targets);
        const queryObject = {
            target: els,
            eventName,
            callBack
        }

        // find the reference in the registeredEvents
        const reference = this.registeredEvents.filter(item => item.target[0] === queryObject.target[0] && item.eventName === queryObject.eventName);
        console.log('reference ', reference)
        reference[0].target.forEach(el => el.removeEventListener(reference[eventName], reference[callBack]));
    }




    // method for creating and dispatching a custome event 
    emitCustom() {
        
    }
}