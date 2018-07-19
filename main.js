

export class Eventz {

    constructor() {
        this.registeredEvents = [];
        this.eventId = 1;
    }
    
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
        });

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




    // method for creating and dispatching a custom event 
    // target is the element that will be listening for the custom event - must be a string
    // emitter is the element that will be dispatching the custom event - must be a string
    // eventName can be any string, it is what you are naming your custom event and what will be listened for
    // bubbles is a boolean value. Defaults to true and if true allows event to bubble up to parent element and be captured there.
    // callback is a function that will be called upon the custom event firing
    // details are any aditional info you want to pass though your customEvent. Can be a string, a function, or an object

    // registerCustom(target, emitter, eventName, callback, detail, bubbles = true) {
    //     console.log('in emitCustom');

    //     // set up the listiner on target element
    //     this.register(target, eventName, callback);

    //     // create the event
    //     const myEvent = new CustomEvent(eventName, {
    //         bubbles: bubbles,
    //         detail: detail,
    //     });

    //     console.log('custom event details: ', myEvent.detail);
    //     console.log('registered events ', this.registeredEvents);
        
    //     // set up the emitter
    //     document.querySelector(emitter).addEventListener('change', e => e.target.dispatchEvent(myEvent));
    // }


}