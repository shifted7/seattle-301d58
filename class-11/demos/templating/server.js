'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
require('ejs');

let PORT = 3000;

// Array of groceries for /list route
let list = ['apples', 'celery', 'butter', 'milk', 'eggs'];

// Array of quantities for /details route
let quantities = [
  {name: 'apples', quantity: 4},
  {name: 'celery', quantity: 1},
  {name: 'butter', quantity: 1},
  {name: 'milk', quantity: 2},
  {name: 'eggs', quantity: 12}
]

// tells express to use the ejs templating view engine
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('index.ejs');
})

app.get('/list', (request, response) => {
  response.render('list.ejs', {groceryList: list});
})

app.get('/quantities', (request, response) => {
  response.render('quantities.ejs', {groceryList: quantities});
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
