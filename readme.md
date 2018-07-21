## Eventz - Event EMITTER

    The Events module in main.js is an event emitter that can register named events with any number of 
    callback handlers. Emit registered events and upon emission pass in any additional arguments to the handler(s). 
    Remove spacific previously registered events. Remove all handlers associated with a given event. And, register 
    a one-time only event/handeler.



### to use:             

    const Eventz = require('./main');

    const ev = new Eventz;





### Methods:


### register(eventName, handler)


    eventName:  a string of your named event. Also the eventName you will pass when calling emit()
   
    handler:    a function name that you pass by reference and will be called upon emission.
   
        note: For the remove method to work correctly you must pass your handler by reference. 
        Seperate out your handler methods and save them in a variable to be passed as a handler.


        Example:  
            
                const logInUser = function() {
                    //check for user in DB and begin session or return error  
                    // do thinhs with additional optional arguments passed in on emit
                    }
                    
                ev.register('submitLoginForm', logInUser );


                --note-- 
                If you wanted to include additional functionality upon the 'submitLoginForm' event
                you can register as many handler as you want, all to be invoked upon emit.


    Returns the class instance upon successful event registration.




 ### emit(eventName, ...args) 
 
    -Calls all registered handlers with a given named event and applies any optional arguments.



    eventName:  String name of a registerd event.
                
    ...args:    Any aditional arguments you want to pass in to your handler(s);    
                



        Example of emitting a click event. Will trigger any handlers registered with the event 'click':

                ev.emit('click');


        Example with optional arguments: trigger an event named 'welcome' and pass in the string 'Greg' and 
        an object:


                ev.emit('welcome', 'Greg' , {greeting: 'message'});


    Retruns false If no event is found registered.
    Returns true upon event(s) emitted.





### remove(eventName, handler)

    -Removes a spacific handler registered to an event.


    eventName:  String name of a registerd event.

    handler:    The variable name referencing the function yuou want to remove or unregister from a given 
                named event.


        Example removing the handler myFunc from the registered event 'componentLoaded':

                ev.remove('componentLoaded', myFunc);


    Returns false if no eventName registered with that name.
    Returns the class instance upon success.




 
### removeAll(eventName)

    -Removes all handlers registered with an event.

    eventName:  String name of a registerd event.


        Example of removing all registered 'hover' event handlers.

                ev.removeAll('hover');


    Returns false if no eventName registered with that name.
    Returns the class instance upon success.




### once(eventName, handler)

    -Registers a one time event and handler which will automatically unregister upon emission.

    eventName:  String name of a registerd event.

    handler:    The variable name referencing the function yuou want to remove or unregister from a given 
                named event.

        Example: 

            Rgister myFunc handler with 'pageLoad' event.

                ev.once('pageLoad', myFunc);


            Now once you emit the 'pageLoad' event  myFunc will be invoked, passed any optional arguments and unregistered.


                ev.emit('pageLoad');




            
           



