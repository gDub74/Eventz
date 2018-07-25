// using the eventsz oject instance from sctipt.js in some of these methods.
import { eventz } from './script.js'


// handler functions/callbacks methods for script.js register methods.

export const handlers = {

    mainCLick: function(){
        this.classList.toggle('mainStyle');
        this.innerHTML = this.innerHTML === 'Looking Good!' ? 'Click Away! ' : 'Looking Good!';
    },


    removeOneClick: function(){
        eventz.remove('#main', 'click', handlers.mainCLick);
    },


    registerAllMouseover: function () {
        this.classList.toggle('listStyle');
    },


    registerAllMouseout: function () {
        eventz.registerAll('li', 'mouseout', handlers.toggleListStyleClass);
    },


    removeAllMouseout: function () {
        eventz.removeAll('li', 'mouseout', handlers.toggleListStyleClass);
    },


    backgroundOnce: function () {
        document.body.setAttribute('style', 'background-color: lightgreen');
        document.getElementById('addText').innerHTML = 'This event can only happen once - try clicking again and nothing will happen.'
    },

    
    toggleListStyleClass:  function () {
        this.classList.toggle('listStyle');
    },
    
}
    
    
















