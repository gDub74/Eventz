// import the Eventz module from main.js
import { Eventz } from '../main.js'


// create an instance of Eventz class
const eventz = new Eventz;


// example of using the register() method 
eventz.register('#main', 'click', function () {
    this.setAttribute("style", "color: white; border: 1px solid blue; background-color:red; font-size: 50px");
    this.innerHTML = 'Yeah baby!'
    console.log('nice job using the register event method')
    });



//example of registerAll() registering all 'li' elements on a 'mouseover' event
eventz.registerAll('li', 'mouseover', function () {
    this.classList.toggle('listStyle');
    });

// and registerAll() on 'mousout'
eventz.registerAll('li', 'mouseout', function () {
    this.classList.toggle('listStyle');
    console.log('mouseout event');
    })


eventz.removeAll('li', 'mouseout', function () {
    this.classList.toggle('listStyle');
    });
// eventz.register('#removeAll', 'click', function () {
//     eventz.removeAll('li', 'mouseout', function () {
//         this.classList.toggle('listStyle');
//     });
//      console.log('here');
// })

    
   





console.log('registered events: ',eventz.registeredEvents);
