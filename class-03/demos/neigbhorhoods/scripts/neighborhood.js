'use strict'

// GOAL: get the data from the dataSet.js and render it to the DOM using handlebars

// constructor function
let hood = [];

function Hood(obj){
  this.name = obj.name;
  this.city = obj.city;
  this.population = obj.population;
  this.founded = obj.founded;
  this.body = obj.body;

  hood.push(this);
}

Hood.prototype.render = function(){
  let source = $('#entry-template').html();
  let template = Handlebars.compile(source);
  var html = template(this);

  $('main').append(html);
}

neighborhoodDataSet.forEach(hood => {
  new Hood(hood).render();
})



// render method using handlebars
  // append it to the DOM using jQuery