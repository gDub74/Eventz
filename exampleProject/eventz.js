

export class Eventz {

    constructor() {
        this.registeredEvents = [];
        this.eventId = 1;
    }
    
    register(target, eventName, callback) {
        if (typeof(target) != 'string' || typeof(eventName) != 'string') {
            throw new Error('target and eventName arguments must be of string type');
        }
        if (typeof(callback) != 'function') {
            throw new Error('callback argument must be of function type');
        }

        const el = document.querySelector(target);
        el.addEventListener(eventName, callback);

        //save reference 
        this.registeredEvents.push({
            id: this.eventId,
            target: el,
            eventName,
            callback,
        });
        this.eventId++
    }

    registerAll(targets, eventName, callback) {
        if (typeof(targets) != 'string' || typeof(eventName) != 'string') {
            throw new Error('target and eventName arguments must be of string type');
        }
        if (typeof(callback) != 'function') {
            throw new Error('callback argument must be of function type');
        }

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

    remove(target, eventName, callback) {
        if (typeof(target) != 'string' || typeof(eventName) != 'string') {
            throw new Error('target and eventName arguments must be of string type');
        }
        if (typeof(callback) != 'function') {
            throw new Error('callback argument must be of function type');
        }
       
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

    removeAll(targets, eventName, callback) {
        if (typeof(targets) != 'string' || typeof(eventName) != 'string') {
            throw new Error('target and eventName arguments must be of string type');
        }
        if (typeof(callback) != 'function') {
            throw new Error('callback argument must be of function type');
        }

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

    once(target, eventName, callback) {
        if (typeof(target) != 'string' || typeof(eventName) != 'string') {
            throw new Error('target and eventName arguments must be of string type');
        }
        if (typeof(callback) != 'function') {
            throw new Error('callback argument must be of function type');
        }
        document.querySelector(target).addEventListener(eventName, handeler);
        function handeler(e) {
            e.target.removeEventListener(eventName, handeler);
            callback();
        }
    }
}