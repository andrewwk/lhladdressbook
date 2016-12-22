//Require async
const async = require("async")

module.exports = (knex) => {

  //function to add users
  const addUsers = (callback) => {
    // Deletes ALL existing entries
    return knex("users").del()
      .then(() => {
        return Promise.all([
          // Inserts seed entries
          knex("users").insert({
            first_name: "Bruce",
            last_name: "Wayne",
            email: "Dark-Knight@gotham.com",
            phone_number: "555-555-1234"
          //return necessary to read user_id's
          }).returning("user_id"),
          knex("users").insert({
            first_name: "Tony",
            last_name: "Stark",
            email: "IAmIronman@stark.com",
            phone_number: "555-555-6969"
          }).returning("user_id"),
          knex("users").insert({
            first_name: "Clark",
            last_name: "Kent",
            email: "kal-el@krypton.world",
            phone_number: "555-123-4567"
          }).returning("user_id"),
          knex("users").insert({
            first_name: "Steve",
            last_name: "Rogers",
            email: "cap@murica.best",
            phone_number: "555-555-5555"
          }).returning("user_id")
        ])
        .then(users => {
          return users.map(user => user[0])
        })
        .then(userIDs => callback(null, userIDs))
        .catch(callback);
      });
  }
  //Function to add addresses
  const addAddresses = (data, callback) => {
    // Deletes ALL existing entries
    return knex("addresses").del()
      .then(() => {
        return Promise.all([
          // Inserts seed entries
          knex("addresses").insert({
            user_id: data[0],
            address: "123 Fakestreet",
            city: "Toronto",
            province: "Ontario",
            country: "Canada",
            postal_code: "1A1 A1A"
          }),
          knex("addresses").insert({
            user_id: data[1],
            address: "1000 Gotham Lane",
            city: "Gotham",
            province: "Quebec",
            country: "Canada",
            postal_code: "2D2 D2D"
          }),
          knex("addresses").insert({
            user_id: data[2],
            address: "987 Infinite Loop",
            city: "Metropolis",
            province: "British Columbia",
            country: "Canada",
            postal_code: "4M9 M9M"
          }),
          knex("addresses").insert({
            user_id: data[3],
            address: "345 Stark Avenue",
            city: "Calgary",
            province: "Alberta",
            country: "Canada",
            postal_code: "6N6 N6N"
          }),
        ])
        .then(response => callback(null, "done"))
        .catch(callback)
      });
  }
  async.waterfall([
    addUsers,
    addAddresses
  ], (err, result) => {
    if(err){
      return console.log("Failed to waterfall.", err);
    } else {
      console.log("Successfull database seed.");
    }
  });
};
