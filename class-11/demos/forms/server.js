// GOAL: collect information from the form and display the thanks.html page after submit

'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

// parses the body of the request object so that we can read the information in it
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3001;

app.use(express.static('./public'));
// app.get('/', (req, res) => {res.send('home')})

app.post('/contact', collectContactInfo);

function collectContactInfo(request, response){
  let contactInfo = request.body;
  console.log(contactInfo)
  response.sendFile('./thanks.html', {root: './public'});
}

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
})