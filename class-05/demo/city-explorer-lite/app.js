'use strict';

// render the weather data to the page

// 1. use AJAX to get the weather objects
    // loop through them and run each one through a constructor function
$.ajax('./city-weather-data.json', {method:'GET', dataType:'JSON'})
  .then(banana => {
    console.log(banana)
    banana.data.forEach((day, i, array) => {
      new Weather(day).render();
    })
  });

// 2. a constructor function
    // based off of the weather objects

let weatherData = [];

function Weather(obj){
  this.time = new Date(obj.time).toDateString();
  this.forecast = obj.summary;
  weatherData.push(this);
}
  
// 3. a prototype function to compile and render handlebars 
    // append it to the page
Weather.prototype.render = function(){
  let template = $('#weather-results-template').html();
  let compile = Handlebars.compile(template);

  $('#weather-container').append(compile(this));
}