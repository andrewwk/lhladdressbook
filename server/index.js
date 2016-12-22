//require env file
require("dotenv").config();
const env = process.env;
const knexConfig = require("../knexfile.js")[env.environment];
const knex = require("knex")(knexConfig);
const knexLogger  = require("knex-logger");
const express = require("express");
const router  = express.Router();
const bodyParser = require("body-parser")
// The app object conventionally denotes the Express application. Create it by calling the
//top-level express() function exported by the Express module:
const app = express();
const port = 4000;
//instead of using knex to seed, force the seed by running the insertion manually each time the server is launched.
require("../db/seeds/sample_data")(knex);
//set the template engine to ejs so that express knows what to look fo
//views directory must be in main project directory
app.set("view engine", "ejs");
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
// app.use(express.static("public"));
//set home page to render index.ejs
app.get("/", (req, res) => {
  //use knex to query the heroku database
  knex("users")
    .select()
    .then((allUsers) => {
      console.log("This is all of the users", allUsers)
      const locals = {
        users: allUsers
      };
      console.log("This is locals variable", locals )
      res.render("index", locals);
    })
    .catch((err) => {
      console.log("Knex query failed", err)
    })
});

app.post


//must be at end of code
app.listen(port, () => {
  console.log("Listening on port", port);
});
