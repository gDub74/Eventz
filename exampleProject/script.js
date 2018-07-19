import { Eventz } from '../main.js'

const eventz = new Eventz;


// example of using the register() method
eventz.register('#main', 'click', function () {
    this.classList.toggle('mainStyle');
    this.innerHTML = this.innerHTML === 'Looking Good!' ? 'Click Away! ' : 'Looking Good!';
    });

// registering a button click that will unregister a click event on #main div in its callback.
eventz.register('#removeOneClick', 'click', function () {
    eventz.remove('#main', 'click', function () {
    this.classList.toggle('mainStyle');
        this.innerHTML = this.innerHTML === 'Looking Good!' ? 'Click Away! ' : 'Looking Good!';
    console.log('nice job using the register event method');
    });
});
    
//example of registerAll() registering all 'li' elements on a 'mouseover' event.
eventz.registerAll('li', 'mouseover', function () {
    this.classList.toggle('listStyle');
    });

// example of registering a button click and then calling the registerAll() method its callback.
eventz.register('#addMouseout', 'click', function () {
    eventz.registerAll('li', 'mouseout', function () {
        this.classList.toggle('listStyle');
    });
});

// and here another button to impliment removeAll() those 'mouseout' events
eventz.register('#removeMouseout', 'click', function () {
    eventz.removeAll('li', 'mouseout', function () {
        this.classList.toggle('listStyle');
    });
});

// register a button with a one time only event
eventz.once('#onlyOnce', 'click', function () {
    document.body.setAttribute('style', 'background-color: lightgreen');
    document.getElementById('addText').innerHTML = 'This event can only happen once - try clicking again and nothing will happen.'
});