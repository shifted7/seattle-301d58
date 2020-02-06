'use strict'

// GOAL: get the data from the dataSet.js and render it to the DOM using handlebars

let neighborhoods = [];

function Neighborhood(dataObj){
  this.name = dataObj.name;
  this.city = dataObj.city;
  this.population = dataObj.population;
  this.founded = dataObj.founded;
  this.body = dataObj.body;

  neighborhoods.push(this);
}

// function Neighborhood(dataObj){
//   for(let key in dataObj){ // iterate over the keys in the object
//     this[key] = dataObj[key]; // for every key in the object, we are assigning the value that come with that key
//   }
// }

Neighborhood.prototype.create = function(){
  // 1. get the template from the HTML document
  let template = $('#hood-template').html();

  // 2. Use Handlebars to "compile" the HTML (from Handlebars)
  let templateRender = Handlebars.compile(template);

  // 3. Don't forget to return the HTML from this method
  return templateRender(this);
}

// get the data from the .js file and make object instances from it
neighborhoodDataSet.forEach(hood => {
  new Neighborhood(hood);
})

// loop through our object instances and run the 'create' function on each one and append it to the DOM

neighborhoods.forEach(hood => {
  $('#neighborhoods').append(hood.create())
})