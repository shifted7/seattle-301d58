// GOAL: render each dog and their info to the index page
  // call a render method on each dog instance

const dogArray = ['dogie'];

function Dog(dogObj){
  this.name = dogObj.name;
  this.image_url = dogObj.image_url;
  this.hobbies = dogObj.hobbies;

  dogArray.push(this);
}

Dog.prototype.render = function(){
  // make a template
  const myTemplate = $('#dog-template').html();

  // make a new section
  const $newSection = $('<section></section>');

  // put the template html into my new section
  $newSection.html(myTemplate);

  // find the h2 and fill it with the name
  $newSection.find('h2').text(this.name);

  // find the img and fill the src and alt
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.name);

  // find the p tag and fill with hobbies
  $newSection.find('p').text(this.hobbies);

  $('main').append($newSection);
}

$.get('data.json', data => {
  data.forEach(dog => {
    new Dog(dog).render();
  })
})
