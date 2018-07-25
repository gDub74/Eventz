import { Eventz } from './eventz.js'
import { handlers } from './handlers.js';

export const eventz = new Eventz;


//handler callbacks are located in handlers.js 

// example of using the register() method
eventz.register('#main', 'click', handlers.mainCLick);

// registering a button click that will unregister a click event on #main div in its callback.
eventz.register('#removeOneClick', 'click', handlers.removeOneClick);
    
//example of registerAll() registering all 'li' elements on a 'mouseover' event.
eventz.registerAll('li', 'mouseover', handlers.registerAllMouseover);

// example of registering a button click and then calling the registerAll() method its callback.
eventz.register('#addMouseout', 'click', handlers.registerAllMouseout);

// and here another button to impliment removeAll() those 'mouseout' events
eventz.register('#removeMouseout', 'click', handlers.removeAllMouseout);

// register a button with a one time only event
eventz.once('#onlyOnce', 'click', handlers.backgroundOnce);

