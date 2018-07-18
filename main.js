

// Emitting named events with any number of arguments.

// Registering a "one-time" handler that will be called at most one time.



export class Eventz {

    constructor() {
        this.registeredEvents = [];
        this.eventId = 1;
    }
    

    // register() is a method to register a named event on one element. 
    // target is a string name of the html tag ID which to arttach the event listiner use '#elementId', or for more detailed query selector info see: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    // eventName is a string that must be of an event type
    // callBack is your custom method that will fire once the event is triggered 
    register(target, eventName, callback) {
        const el = document.querySelector(target);
        el.addEventListener(eventName, callback);
        
        //save reference 
        this.registeredEvents.push({
            id: this.eventId,
            target: el,
            eventName,
            callback,
        })
        
        // increment this.eventId for next event 
        this.eventId++
    }

    

    // registerAll is similar to register() except it can register all of a given element or class type at once. 
    // For example if you wanted to add a 'click' listiner to all 'buttons' or a 'mouseover' event to all your 'li' elements on your document.
    // for info on querySelecorAll() see: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll 

    registerAll(targets, eventName, callback) {
        const els = document.querySelectorAll(targets);
        els.forEach(el => el.addEventListener(eventName, callback));
        
        this.registeredEvents.push({
            id: this.eventId,
            target: els,
            eventName,
            callback,
        })

        this.eventId++;
    }


    
    // method for removing a registered event
    // The target, eventName, and callback must match exactly to the arguments used durring the register() method.
    remove(target, eventName, callback) {
        const el = document.querySelector(target);
        const lookUpObject = {
            target: el,
            eventName,
            callback
        }

         // find the reference in the registeredEvents - filter method returns an array
        const reference = this.registeredEvents.filter(item => item.target === lookUpObject.target && item.eventName === lookUpObject.eventName);

        // remover the listiner if we found a match 
        if (reference[0]) {
            reference[0].target.removeEventListener(reference[0].eventName, reference[0].callback);

            // now remove the reference from the registeredEvents object  
            this.registeredEvents = this.registeredEvents.filter(item => item.id != reference[0].id);
        }
    }


    // remove all method for removing all registered listeners given element or class that were placed at the same time. 
    // The targets, eventName, and callback must match exactly to the arguments used durring the registerAll() method.
    removeAll(targets, eventName, callback) {
        const els = document.querySelectorAll(targets);
        const lookUpObject = {
            target: els,
            eventName,
            callback
        }

        // find the reference in the registeredEvents - filter method returns an array
        const reference = this.registeredEvents.filter(item => item.target[0] === lookUpObject.target[0] && item.eventName === lookUpObject.eventName);

        // remove listiners and reference in registeredEvents if we've found the matching events
        if (reference[0]) {
            reference[0].target.forEach(el => el.removeEventListener(reference[0].eventName, reference[0].callback));
            this.registeredEvents = this.registeredEvents.filter(item => item.id != reference[0].id);
        }

    }

    // registering a one time only event that will remove the event listiner once the event fires
    once(target, eventName, callback) {
        document.querySelector(target).addEventListener(eventName, handeler);
        function handeler(e) {
            e.target.removeEventListener(eventName, handeler);
            callback();
        }
    }

    // method for creating and dispatching a custome event 
    emitCustom( ) {
        
    }
}