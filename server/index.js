//require env file
require("dotenv").config();
const express = require('express');
const app = express();
const db  = require('./db');
const port = process.env.port;

//instead of using knex to seed, force the seed by running the insertion manually each time the server is launched.
require('../db/seeds/sample_users')(db);

app.listen(port);
console.log("Listening on port", port);
