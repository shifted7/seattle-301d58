'use strict';

const express = require('express');
require('dotenv').config();
const app = express();
const superagent = require('superagent');
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3001;

app.get('/location', (request, response) => {

  let city = request.query.city;
  // look in my DB to see if location already exists

  let sql = "SELECT * FROM locations WHERE search_query=$1;";
  let safeValues = [city];

  client.query(sql, safeValues)
    .then(results => {
      if(results.rows.length > 0){
        console.log('found the city in the DB')
        // if it does, send that file to the front end
          // it will make my life easier if the structure of the DB data is in the same format as what the front end is expecting (aka - my table should have the same keys as my constructor)
        response.send(results.rows[0]);
        // results.rows = [{
          // search_query:'seattle',
          // formatted_query:'Seattle, WA',
          // latitude: '23piqt;jrgo',
          // longitude: 'a;ekrjgapir'
        //}]
      } else {
        console.log('did not find the city in the DB. Going to the API')
        // if it doesn't, then I need to go to the API and get the data
          // save it to the database
          // send it to the frontend
          // let geoData = require('./data/geo.json');
          let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API}&q=${city}&format=json`;
      
          superagent.get(url)
            .then(results => {
              console.log('results from superagent', results.body);
              let geoData = results.body;
              let location = new City(city, geoData[0]);

              let sql="INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);";
              let safeValues = [location.search_query, location.formatted_query, location.latitude, location.longitude];

              client.query(sql, safeValues);

              response.status(200).send(location);
            }).catch(console.error(err));
      }
    })
})

app.get('/weather', (request, response) => {
  let {search_query, formatted_query, latitude, longitude} = request.query;
  // { search_query: 'tacoma',
  // formatted_query: 'Lynnwood, Snohomish County, Washington, USA',
  // latitude: '47.8278656',
  // longitude: '-122.3053932' }

  let darkSky = require('./data/darksky.json');

  let weatherArray = darkSky.daily.data;

  let newWeatherArray = [];
  weatherArray.forEach(day => {
    newWeatherArray.push(new Weather(day));
  })

  response.send(newWeatherArray)
})

function City(city, obj){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

function Weather(day){
  this.time = new Date(day.time).toDateString();
  this.forecast = day.summary;
}

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  })