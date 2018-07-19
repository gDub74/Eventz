Eventz is a vanilla JavaScript event emitter module, similar to jQuery's handeling of events.

Use:    Create a new instance of Eventz class and call desired methods on that instance:
        For working examples check out the exapmleProject folder.


    const eventz = new Eventz;



Methods: (found in main.js)


    register(target, eventName, callback) 

        Registers an event, its target, and the function to run upon the event firing.
        target: a string name of the html tag ID which to arttach the event listiner. 
        Use '#elementId', or for more detailed querySelector() info for use with the 
        'target' argument to be passed see: 
        https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
        eventName: a string that must be of an event type
        callback: your custom method that will fire once the event is triggered 

        example use:

            eventz.register('#myButton', 'click', function() {
                //do something
            })




    registerAll(targets, eventName, callback) 

        RegisterAll() is similar to register() except it registers all of a given element 
        or class type at once. For example if you wanted to add a 'click' listiner to all 
        'buttons' or a 'mouseover' event to all your 'li' elements on your document.
        for info on querySelecorAll() for use with the 'target' argument see: 
        https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll 



    
    remove(target, eventName, callback)

        Method for removing a registered event.  The target, eventName, and callback must 
        match exactly to the arguments used durring the register() method.




    removeAll(targets, eventName, callback) 

        Method for removing a group of events that were regitered at the same time. The target, 
        eventName, and callback must match exactly to the arguments used durring the register() 
        method.



    once(target, eventName, callback)    

        registering a one time only event that will remove the event listiner once the 
        event fires.