const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});

const express = require('express');
const app = express();
const db  = require('./db');

const port = 4000;

app.listen(port);
console.log("Listening on port", port);
