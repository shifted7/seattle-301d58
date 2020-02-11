const myFamily=['Adam', 'Ilya', 'Cookie', 'Tangerine'];

myFamily[1] = 'Bob';

///////////////////////

function sayHi(){
  console.log('hi');
}

const sayHi = () => {
  console.log('hi');
}

function Cat(hair, name){
  this.hair = hair;
  this.name = name;
}

let tangerine = new Cat('orange', 'Tangerine');

Cat.prototype.sayHello = function(){
  console.log(`${this.name} says hi`)
}

tangerine.sayHello();