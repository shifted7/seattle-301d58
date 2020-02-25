'use strict';

const express = require('express');
const app = express();
const pg = require('pg');
require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = 3000;

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

app.get('/add', (request, response) => {
  let first = request.query.first;
  let last = request.query.last;

  let SQL = 'INSERT INTO people (first_name, last_name) VALUES ($1, $2)';
  let safeValues = [first, last];

  client.query(SQL, safeValues)
})

app.get('/display', (request, response) => {
  let SQL = 'SELECT * FROM people';

  client.query(SQL)
    .then(results => {
      response.json(results.rows);
    })
})

client.connect()
  .then(
    app.listen(PORT, () => console.log(`listening on ${PORT}`))
  )
