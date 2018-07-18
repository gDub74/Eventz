This module is a vanilla JavaScript fersion of an event emitter similar to jQuery's handeling of events.

To use import into your script file create a new instance, and call desired methods on that instance:

const eventz = new Eventz;

eventz.register('#myButton', 'click', function() {
    //do something
})



Methods:


