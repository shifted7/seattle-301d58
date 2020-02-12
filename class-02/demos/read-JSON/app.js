// GOAL: render each dog and their info to the index page
  // call a render method on each dog instance

$.ajax('/data.json', {method: 'GET', dataType: 'JSON'})
	.then(bananas => {
    bananas.forEach(dog => {
      new Dog(dog).render();
    })
  })


// copy the template 
// fill the template with each object instance
// render that to the page
let dogArray = [];

function Dog(obj){
  this.name = obj.name;
  this.image_url=obj.image_url;
  this.hobbies = obj.hobbies;
  dogArray.push(this);
}

Dog.prototype.render = function(){
  // select all the html in the template
  const myTemplate = $('#dog-template').html();

  // make a new section 
  const $newSection = $('<section></section>');
  // fill that new section with the template html
  $newSection.html(myTemplate);
  // find the h2, and assign it to the name
  $newSection.find('h2').text(this.name);
  // find the image and assign it to the image_url
  $newSection.find('img').attr('src', this.image_url);
  // find the p and assign it to the hobbies
  $newSection.find('p').text(this.hobbies);

  // append it to the main
  $('main').append($newSection);
}