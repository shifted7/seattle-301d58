'use strict';

const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');
app.use(cors());

// libraries
const client = require('./lib/client');
const handleLocation = require('./lib/handleLocation');

const PORT = process.env.PORT || 3001;

const superagent = require('superagent');

app.get('/location', handleLocation)
app.get('/weather', handleWeather)

function handleWeather(request, response){
  let locationObject = request.query;
  console.log(locationObject)

  let url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${locationObject.latitude},${locationObject.longitude}`;

  superagent.get(url)
    .then(results => {
      let weatherArray = results.body.daily.data;

      let weatherMap = weatherArray.map(day => new Weather(day));

      response.status(200).send(weatherMap);
      // loop over the array
      // send in each object to the constructor
    })
}


app.get('/trails', (request, response) => {
  let { 
  latitude, 
  longitude, } = request.query;

  let url = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${process.env.TRAILS_API_KEY}`;

  superagent.get(url)
    .then(results => {
      const dataObj = results.body.trails.map(trail => new Trail(trail));
      response.status(200).send(dataObj)
    })
})


function Weather(obj){
  this.time = new Date(obj.time*1000).toDateString();
  this.forecast = obj.summary;
}

function Trail(obj){
  this.name = obj.name;
  this.location = obj.location;
  this.length = obj.length;
  this.stars = obj.stars;
  this.star_votes = obj.starVotes;
  this.summary = obj.summary;
  this.trail_url = obj.url;
  this.conditions = obj.conditionStatus;
  this.condition_date = obj.conditionDate.slice(0,10);
  this.condition_time = obj.conditionDate.slice(11,19);
}

client.connect()
  .then(
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`)
    })
  )