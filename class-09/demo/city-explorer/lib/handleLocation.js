'use strict';

require('dotenv').config();
const getLocationApiResults = require('./getLocationApiResults');

function handleLocation(request, response){
  let city = request.query.city;
  let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;

  getLocationApiResults(response, url, city)

}


module.exports = handleLocation;