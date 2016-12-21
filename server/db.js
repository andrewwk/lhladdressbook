const config      = require('../knexfile.js');
const env         = 'development';
const knex        = require('knex')(config[env]);

//Require knexfile that has already been exported
module.exports = knex;

knex.migrate.latest([config]);
