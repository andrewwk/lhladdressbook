module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'addressbook'
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
