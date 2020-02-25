'use strict';

const superagent = require('superagent');
const City = require('./city');

function getLocationApiResults(response, url, city){
  superagent.get(url)
  .then(superagentResults => {
    let location = new City(city, superagentResults.body[0])
    response.send(location);
  })
}

module.exports = getLocationApiResults;