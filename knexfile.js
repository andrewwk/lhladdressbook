//require env file
require("dotenv").config();
//Export knexfile
module.exports = {

  development: {
    client: "pg",
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      port: process.env.port,
      ssl: process.env.ssl
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
