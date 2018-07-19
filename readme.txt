This module is a vanilla JavaScript version of an event emitter, similar to jQuery's handeling of events.

To use, import into your script file create a new instance, and call desired methods on that instance:



    const eventz = new Eventz;

eventz.register('#myButton', 'click', function() {
    //do something
})




Methods:


    register(target, eventName, callback) 


        Registers and event its target, and the function to run upon the event firing.
        target: a string name of the html tag ID which to arttach the event listiner. 
        Use '#elementId', or for more detailed querySelector() info see: 
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
        for info on querySelecorAll() see: 
            https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll 