require("dotenv").config();

const env        = process.env;
const express    = require("express");
// The app object conventionally denotes the Express application. Create it by calling the
//top-level express() function exported by the Express module:
const app        = express();
const router     = express.Router();
const bodyParser = require("body-parser")
const knexConfig = require("../knexfile.js")[env.environment];
const knex       = require("knex")(knexConfig);
const knexLogger = require("knex-logger");
const async = require("async")
const port       = 4000;
//require knex file to seed database on server start
require("../db/seeds/sample_data")(knex);
//set the template engine to ejs so that express knows; views directory must be in main project directory
app.set("view engine", "ejs");
//Tells express where to look for style stylesheets and scripts
app.use(express.static("public"));
app.use("public/stylesheets", express.static("public/stylesheets"));
app.use("public/scripts", express.static("public/scripts"));

app.use(bodyParser.urlencoded({extended: true}));
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
//set home page to render index.ejs
app.get("/", (req, res) => {
  //use knex to query the heroku database
  knex("users")
    .join("addresses", "users.user_id", "=", "addresses.user_id")
    .select()
    .then((allUsers) => {
      const locals = {
        users: allUsers
      };
      res.render("index", locals);
    })
    .catch((err) => {
      console.log("Knex query failed", err)
    })
});
//search for any contact by first or last name
app.post("/query_result", (req, res) => {
  const name = req.body.find_contact
  knex("users")
    .join("addresses", "users.user_id", "=", "addresses.user_id")
    .whereRaw(`LOWER(first_name) LIKE '%${name}%'`)
    .orWhereRaw(`LOWER(last_name) LIKE '%${name}%'`)
    .select()
    .then((result) => {
      const locals = {
        info: result
      };
      console.log("blah", locals);
      res.render("query_result", locals);
    })
    .catch((err) => {
      console.log("That mofo couldn't be found", err)
    })
});
//add a new contact to database
app.post("/contacts/new", (req, res) => {
  const first_name   = req.body.first_name
  const last_name    = req.body.last_name
  const email        = req.body.email
  const phone_number = req.body.phone_number
  const address      = req.body.address
  const city         = req.body.city
  const province     = req.body.province
  const postal_code  = req.body.postal_code
  const country      = req.body.country
  
  async.waterfall([
    function(callback) {
      return knex("users")
        .returning("user_id")
        .insert([{first_name: first_name, last_name: last_name, email: email, phone_number: phone_number}])
        .then(response => callback(null, response))
        .catch(callback)
    },
    function(data, callback) {
      const user_id = data[0]
      return knex ("addresses")
        .insert([{user_id: user_id, address: address, city: city, province: province, postal_code: postal_code, country: country}])
        .then(response => callback(null, "done"))
        .catch(callback)
    },
  ], (err, result) => {
    if(err){
      return console.log("You dun fucked up. Failed to waterfall you fool!", err);
    } else {
      console.log("Successfull addition of some new mofo.");
      res.redirect("/");
    }
  });

});
//add a new contact page
app.get("/contacts/new", (req, res) => {
  res.render("new");
});

//must be at end of code
app.listen(port, () => {
  console.log("Listening on port", port);
});
